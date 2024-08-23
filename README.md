# Socket.io Real-Time Chat App

A real-time chat application built with **Socket.IO**, **Express**, and **SQLite**. This application demonstrates how to efficiently create a bi-directional communication channel between a client and a server to enable seamless, real-time messaging between multiple users.

## Overview

Traditionally, writing chat applications using popular web development stacks like LAMP (PHP) was complicated due to server polling, timestamp tracking, and slower response times. However, with the help of **Socket.IO**, it becomes much easier to build a fast, reliable chat app.

This project leverages **Socket.IO** to set up a two-way communication channel between the client and server, allowing the server to push messages to all connected clients as soon as a new message is received.

The app follows the steps and principles explained in the [Socket.IO Tutorial](https://socket.io/docs/v4/tutorial/introduction).

## Features

- **Real-time Communication**: Uses WebSockets to enable real-time communication between the server and clients.
- **SQLite Integration**: Stores chat messages in a local SQLite database for persistent message storage.
- **Cluster Support**: Utilizes the clustering feature for horizontal scaling across CPU cores.
- **Message Recovery**: Ensures clients can recover missed messages when reconnecting after a disconnection.

## How It Works

1. **Client Sends a Message**: When a user writes a message, it is sent to the server via **Socket.IO**.
2. **Message is Stored**: The server stores the message in an **SQLite** database to persist the chat history.
3. **Broadcast to Clients**: The server broadcasts the message to all connected clients in real-time.
4. **Message Recovery**: When a client reconnects, the app retrieves any missed messages from the database based on their last known message timestamp.

## Tech Stack

- **Socket.IO**: Enables real-time, bi-directional communication between the server and the clients.
- **Express.js**: Provides the backend framework for handling HTTP requests.
- **SQLite**: A simple, lightweight database for storing chat messages.
- **Node.js**: The backend runtime for running the server-side logic.

## Setup & Installation

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/obinnafranklinduru/Socketio-RealTime-Chat-App.git
   cd Socketio-RealTime-Chat-App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm run start
   ```

4. Open your browser and navigate to:

   ```bash
   http://localhost:3000
   ```

You should now be able to chat in real-time with other connected users!

## Usage

### Sending Messages

Once the app is running, you can type messages in the chatbox, and the messages will appear in the chat window instantly for all users connected to the server.

### Recovering Lost Messages

If a user gets disconnected and reconnects, the server will automatically send any messages they missed while they were offline.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/obinnafranklinduru/Socketio-RealTime-Chat-App/blob/main/LICENSE) file for more details.

## Contribution

Feel free to fork this repository and open a pull request if you have any improvements or bug fixes.

---

Built with ❤️ using [Socket.IO](https://socket.io/).

---

This GitHub repository setup and README will allow other developers to easily understand your project and follow the tutorial from Socket.IO for building a real-time chat application.
