function setupSocketHandlers(io, db) {
  // Setup a connection handler for each new socket connection
  io.on("connection", async (socket) => {
    // Event handler for receiving "chat message" from a client
    socket.on("chat message", async (msg, clientOffset, callback) => {
      let result;
      try {
        // Insert the received message and client offset into the database
        result = await db.run(
          "INSERT INTO messages (content, client_offset) VALUES (?, ?)",
          msg, // message content
          clientOffset // unique client offset to prevent duplicate messages
        );
      } catch (e) {
        // Handle SQLITE_CONSTRAINT error (unique constraint violation)
        if (e.errno === 19 /* SQLITE_CONSTRAINT */) {
          // Acknowledge the client that the message was already inserted
          callback();
        }
        return;
      }
      // Broadcast the message to all clients with the server's message ID
      io.emit("chat message", msg, result.lastID);
      // Acknowledge the event back to the client
      callback();
    });

    // If the socket connection is not recovered (e.g., not using connection state recovery)
    if (!socket.recovered) {
      try {
        // Fetch messages from the database that were missed (those with id > serverOffset)
        await db.each(
          "SELECT id, content FROM messages WHERE id > ?",
          [socket.handshake.auth.serverOffset || 0], // Get messages after the client's last known message
          (_err, row) => {
            // Emit each missed message back to the client
            socket.emit("chat message", row.content, row.id);
          }
        );
      } catch (e) {
        // Throw an error if message fetching fails
        throw new Error(e.message);
      }
    }
  });
}

// Export the socket handler setup function for use in the main application
module.exports = setupSocketHandlers;
