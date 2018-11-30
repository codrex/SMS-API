class Message {
  static __getIncludes(db) {
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
      include: Message.__getIncludes(db),
    });
    return messageRecord;
  }

  static async get(db, messageId) {
    const messageRecord = await db.Message.findById(messageId, {
      include: Message.__getIncludes(db),
    });
    return messageRecord;
  }
}

module.exports = Message;
