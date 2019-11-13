const { setupConsumers } = require("../index");
const { QUEUE_NAME } = require("../../constants");
const { setupTopology, getRabbitmqConnection } = require("../../rabbitmq");

let connection = null;
let channel = null;

beforeAll(async () => {
  connection = await getRabbitmqConnection();
  channel = await connection.createConfirmChannel();
  await setupTopology(channel);
  await setupConsumers(channel);
});

afterAll(async () => {
  await channel.ackAll();
  await channel.close();
  await connection.close();
});

beforeEach(async () => {
  await channel.ackAll();
});

describe("index", () => {
  test("success", async () => {
    await channel.sendToQueue(QUEUE_NAME, Buffer.from("success"));

    const result = await channel.waitForConfirms();
    expect(result).toContainEqual(undefined);
  });

  test("error", async () => {
    await channel.sendToQueue(QUEUE_NAME, Buffer.from("error"));

    const result = await channel.waitForConfirms();
    expect(result).not.toContainEqual(undefined);
  });
});
