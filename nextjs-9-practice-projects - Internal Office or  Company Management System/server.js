// server.js

// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");
// const { Server } = require("socket.io");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   });

//   const io = new Server(server);

//   io.on("connection", (socket) => {
//     console.log("Client connected");

//     socket.on("send-message", (msg) => {
//       console.log("Chat message:", msg);
//       socket.broadcast.emit("receive-message", msg);
//     });

//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//     });
//   });

//   server.listen(3000, () => {
//     console.log("> Ready on http://localhost:3000");
//   });
// });

// server.js (Express version)// server.js
const express = require("express");
const http = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);
  const io = new Server(server);

  // --- Socket.io events ---
  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("send-message", (msg) => {
      console.log("Chat message:", msg);
      socket.broadcast.emit("receive-message", msg);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  // --- (Optional) API routes or custom endpoints here ---
  // Example: expressApp.use("/api/hello", (req, res) => res.json({ msg: "hi" }));

  // --- Correct catch-all for Next.js pages ---
  // This works for both Express 4.x and 5.x
  expressApp.use((req, res) => {
    return handle(req, res);
  });

  // --- Start server ---
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
