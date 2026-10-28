import express from "express";
import { startDiscordBot } from "./bot.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get("/", (_req, res) => res.send("Hello World!"));

app.listen(port, "0.0.0.0", () => {
  console.info(`Example app listening at http://localhost:${port}`);
});

await startDiscordBot();
