import { Partitioners } from "kafkajs";
import kafkaClient from "./service/kafkaclient.js";

const TOPIC = process.env.KAFKA_TOPIC;

const producerRun = async () => {
  const producer = kafkaClient.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  await producer.connect();

  
  const [name, value, partition] = ["oscar","100","1"];
  await producer.send({
    topic: TOPIC,

    messages: [
      {
        partition: parseInt(partition),
        value: JSON.stringify({ name, value }),
      },
    ],
  });
  //await producer.disconnect();
};

// Define a function to call producerRun() asynchronously every 5 seconds
function callProducer() {
  setInterval(async () => {
      await producerRun();
  }, 5000); // 5000 milliseconds = 5 seconds
}

// Call the function to start the interval
//callProducer();
export default callProducer;