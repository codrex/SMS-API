const Message = require('../Message');
const User = require('../User');
const db = require('../../../db/models');
const { USER_ONE, USER_TWO, createMessageMock } = require('../../../constants');

const senderData = USER_ONE;
const receiverData = USER_TWO;
let sender = {};
let receiver = {};

describe('Message model repo', () => {
  beforeAll(async () => {
    sender = await User.create(db, senderData);
    receiver = await User.create(db, receiverData);
  });

  describe('create', () => {
    it('should create user record', async () => {
      const messageData = createMessageMock(sender.id, receiver.id);

      const message = await Message.create(db, messageData);
      expect(message.text).toBe(messageData.text);
      expect(message.status).toBe(messageData.status);
      expect(message.sender.name).toBe(senderData.name);
      expect(message.receiver.name).toBe(receiverData.name);
    });

    it('should get a message', async () => {
      const messageData = createMessageMock(sender.id, receiver.id);
      let message = await Message.create(db, messageData);
      message = await Message.get(db, message.id);
      expect(message.text).toBe(messageData.text);
      expect(message.status).toBe(messageData.status);
      expect(message.sender.name).toBe(senderData.name);
      expect(message.receiver.name).toBe(receiverData.name);
    });
  });
});
