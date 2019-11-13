const { setupConsumers } = require("./consumers");
const { getRabbitmqConnection, setupTopology } = require("./rabbitmq");

const main = async () => {
  const connection = await getRabbitmqConnection();
  const channel = await connection.createChannel();
  await setupTopology(channel);
  await setupConsumers(channel);
};

main();
