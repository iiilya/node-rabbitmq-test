const { QUEUE_NAME } = require("../constants");

const setupConsumers = async channel => {
  await channel.consume(QUEUE_NAME, async msg => {
    if (msg.content.toString() === "error") {
      await channel.nack(msg);
    } else {
      await channel.ack(msg);
    }
  });
};

module.exports = {
  setupConsumers
};
