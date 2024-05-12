import { Kafka } from "kafkajs";
import ip from "ip";

const HOST = process.env.KAFKA_HOST || ip.address();
const kafkaClient = new Kafka({
  clientId: "proctoring-app",
  brokers: [`${HOST}:9092`],
});

export default kafkaClient;
