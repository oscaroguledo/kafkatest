import { Kafka } from "kafkajs";
import ip from "ip";

//const HOST = process.env.HOST_IP || '192.168.189.46' || ip.address();
const kafkaClient = new Kafka({
  clientId: "realtime-dashboard",
  brokers:['192.168.189.46:9092'],
  //brokers: [`${HOST}:9092`],
});

export default kafkaClient;
