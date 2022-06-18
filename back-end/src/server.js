require("dotenv/config");
require("./database");

const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");

const server = http.createServer(app);

const imageStorageService = require("../src/app/services/imageStorageService");

const io = socket(server, {
  transports: ["polling"],
  cors: {
    cors: {
      origin: "*",
    },
  },
});

io.on("connection", async (socket) => {
  socket.on("images.init", async (data) => {
    const result = await imageStorageService.get();
    io.emit("lstImages.message", result);
  });

  socket.on("disconnect", (data) => {
    console.log("[socket] Disconnect => ", data);
  });
});

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use("/static", express.static("public"));

app.post("/api/v1/images", async (req, res) => {
  try {
    await imageStorageService.create(req.body);

    setTimeout(async () => {
      const result = await imageStorageService.get();
      console.log("result: ", result);
      io.emit("lstImages.message", result);
    }, 2000);

    return res.json({
      ok: true,
      message: "Imagens processadas com sucesso!",
    });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
});

server.listen(3001, () => {
  console.log("Servidor rodando");
});
