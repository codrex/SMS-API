class Message {
  static _getIncludes(db) {
    return [
      {
        model: db.User,
        as: 'sender',
      },
      {
        model: db.User,
        as: 'receiver',
      },
    ];
  }

  static async create(db, payload) {
    const { senderId, receiverId, ...message } = payload;
    let messageRecord = await db.Message.create(message);
    await messageRecord.setSender(senderId);
    await messageRecord.setReceiver(receiverId);
    messageRecord = await messageRecord.reload({
      include: Message._getIncludes(db),
    });
    return messageRecord;
  }

  static async get(db, messageId) {
    const messageRecord = await db.Message.findById(messageId, {
      include: Message._getIncludes(db),
    });
    return messageRecord;
  }

  static async delete(db, messageId) {
    const result = await db.Message.destroy({
      where: {
        id: messageId,
      },
    });
    return result;
  }

  static async update(db, messageId, message) {
    const messageRecord = await db.Message.update(message, {
      where: {
        id: messageId,
      },
      returning: true,
    });
    return messageRecord;
  }
}

module.exports = Message;
