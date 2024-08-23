const { createServer } = require("node:http");
const cluster = require("node:cluster");
const { availableParallelism } = require("node:os");

const express = require("express");
const { Server } = require("socket.io");
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");

const setupDatabase = require("./database");
const setupSocketHandlers = require("./socket-handlers");

if (cluster.isPrimary) {
  const numCPUs = availableParallelism();
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ PORT: 3000 + i });
  }
  return setupPrimary();
}

async function main() {
  try {
    const db = await setupDatabase();

    const app = express();
    app.use(express.static("public"));

    const httpServer = createServer(app);

    const io = new Server(httpServer, {
      connectionStateRecovery: {},
      adapter: createAdapter(),
    });

    setupSocketHandlers(io, db);

    const port = process.env.PORT;
    httpServer.listen(port, () => console.log("App is running......"));
  } catch (error) {
    console.error(error.message);
  }
}

main();
