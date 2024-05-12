import express from "express";
import consumerRun from "./consumer.js";
import { wss1, wss2, startWebSocketServers } from "./service/websocket.js";
import adminInit from "./admin.js";
const TOPIC = process.env.KAFKA_TOPIC;
const app = express();

const PORT = 5000;

const init = async () => {
  await adminInit(TOPIC);
  await startWebSocketServers();
  await consumerRun("realtime-data", [TOPIC], wss1);
  await consumerRun("realtime-data", [TOPIC], wss2);
};

app.listen(PORT, async () => {
  console.log(`Listiening to port ----> ${PORT}`);
  init();
});
