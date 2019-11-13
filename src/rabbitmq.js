const amqplib = require("amqplib");
const { QUEUE_NAME } = require("./constants");

const getRabbitmqConnection = async () => {
  return amqplib.connect(process.env.RABBITMQ_URL || "amqp://127.0.0.1:5672");
};

const setupTopology = async channel => {
  await channel.assertQueue(QUEUE_NAME);
};

module.exports = {
  getRabbitmqConnection,
  setupTopology
};
