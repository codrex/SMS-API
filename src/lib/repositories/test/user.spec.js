const User = require('../User');
const Message = require('../Message');
const db = require('../../../db/models');
const { createMessageMock, createUserMock } = require('../../../constants');

describe('User model repo', () => {
  describe('create', () => {
    it('should create user record', async () => {
      const userData = createUserMock();
      const userRecord = await User.create(db, userData);
      expect(userRecord.phoneNumber).toBe(userData.phoneNumber);
      expect(userRecord.name).toBe(userData.name);
    });
  });

  describe('update', () => {
    it('should update user record', async () => {
      const userData = createUserMock();
      let userRecord = await User.create(db, userData);
      userRecord = await User.update(db, userRecord.id, {
        name: 'mary doe',
      });
      expect(userRecord[1][0].name).toBe('mary doe');
      expect(userRecord[0]).toBe(1);
    });
  });

  describe('get', () => {
    it('should return user record', async () => {
      const userData = createUserMock();
      let userRecord = await User.create(db, userData);
      userRecord = await User.get(db, userRecord.id);
      expect(userRecord.phoneNumber).toBe(userData.phoneNumber);
      expect(userRecord.name).toBe(userData.name);
    });

    it('should return records along with its associations', async () => {
      const senderRecord = await User.create(db, createUserMock());
      const receiverRecord = await User.create(db, createUserMock());
      await Message.create(
        db,
        createMessageMock(senderRecord.id, receiverRecord.id),
      );
      const sender = await User.get(db, senderRecord.id, {
        sentMsg: true,
      });
      const receiver = await User.get(db, senderRecord.id, {
        receivedMsg: true,
      });
      expect(sender).toHaveProperty('sentMessages');
      expect(receiver).toHaveProperty('receivedMessages');
    });
  });

  describe('delete', () => {
    it('should delete a user and all messages sent by the user', async () => {
      const senderRecord = await User.create(db, createUserMock());
      const receiverRecord = await User.create(db, createUserMock());
      const message = await Message.create(
        db,
        createMessageMock(senderRecord.id, receiverRecord.id),
      );
      await User.delete(db, senderRecord.id);
      const sender = await User.get(db, senderRecord.id);
      const senderMessage = await Message.get(db, message.id);
      const receiver = await User.get(db, receiverRecord.id, {
        receivedMsg: true,
      });
      expect(sender).toBe(null);
      expect(senderMessage).toBe(null);
      expect(receiver.receivedMessages.length).toBe(0);
    });

    it('should remove ref to them from their received messages when user is deleted', async () => {
      const senderRecord = await User.create(db, createUserMock());
      const receiverRecord = await User.create(db, createUserMock());
      let message = await Message.create(
        db,
        createMessageMock(senderRecord.id, receiverRecord.id),
      );
      await User.delete(db, receiverRecord.id);
      message = await Message.get(db, message.id);
      expect(message.receiver).toBe(null);
    });
  });
});
