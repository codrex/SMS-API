const Message = require('../Message');
const User = require('../User');
const db = require('../../../db/models');
const { STATUS } = require('../../../constants');

const senderData = { phoneNumber: '09049489039', name: 'jone doe' };
const receiverData = { phoneNumber: '09040004039', name: 'jone doe' };
let sender = {};
let receiver = {};

describe('Message model repo', () => {
  beforeAll(async () => {
    sender = await User.create(db, senderData);
    receiver = await User.create(db, receiverData);
  });
  describe('create', () => {
    it('should create user record', async () => {
      const messageData = {
        text: 'message',
        senderId: sender.id,
        receiverId: receiver.id,
        status: STATUS.UNREAD,
      };

      const message = await Message.create(db, messageData);
      expect(message.text).toBe(messageData.text);
      expect(message.status).toBe(messageData.status);
      expect(message.sender.name).toBe(senderData.name);
      expect(message.receiver.name).toBe(receiverData.name);
    });

    it('should get message', async () => {
      const messageData = {
        text: 'message',
        senderId: sender.id,
        receiverId: receiver.id,
        status: STATUS.UNREAD,
      };

      let message = await Message.create(db, messageData);
      message = await Message.get(db, message.id);
      expect(message.text).toBe(messageData.text);
      expect(message.status).toBe(messageData.status);
      expect(message.sender.name).toBe(senderData.name);
      expect(message.receiver.name).toBe(receiverData.name);
    });
  });
});
