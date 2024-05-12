import kafkaClient from "./service/kafkaclient.js";

const adminInit = async (topic) => {
  console.log("Admin INITIATED");
  const admin = kafkaClient.admin();
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Admin Connected Successfully...");

  console.log(`Creating Topic [${topic}]`);
  await admin.createTopics({
    topics: [
      {
        topic: topic,
        numPartitions: 2,
      },
    ],
  });
  console.log(`Topic [${topic}] Created Successfully `);

  console.log("Disconnecting Admin..");
  await admin.disconnect();
  console.log("Admin Disconnected Successfully...");
}
export default adminInit;
