import kafkaClient from "./service/kafkaclient.js";

const consumerRun = async (groupId, topics) => {
  const consumer = kafkaClient.consumer({ groupId: groupId });
  await consumer.connect();
  await consumer.subscribe({ topics: topics });

  const handleMessage = async ({ topic, partition, message }) => {
    console.log(
      `Topic - ${topic}, Partition - ${partition}, Message - ${message.value.toString()}`
    );
    try {
          //addmessage(JSON.parse(message.value.toString()));
          console.log(`Consumer caught ${message.value.toString()} successfully.`);
      } catch (err) {
          console.error(`Error processing ${topic}: `, err);
          pause();
          setTimeout(() => {
              consumer.resume([{ topic: topic }]);
          }, 60 * 1000);
      }
    };

  try {
    await consumer.run({
      eachMessage: handleMessage,
    });
  } catch (error) {
    console.error(error);
  }
};

export default consumerRun;
