class User {
  static _getReceivedMsgIncludes(db) {
    return {
      model: db.Message,
      as: 'receivedMessages',
      include: [
        {
          model: db.User,
          as: 'sender',
        },
      ],
    };
  }

  static _getSentMsgIncludes(db) {
    return {
      model: db.Message,
      as: 'sentMessages',
      include: [
        {
          model: db.User,
          as: 'receiver',
        },
      ],
    };
  }

  static _getIncludes(options, db) {
    const { receivedMsg, sentMsg } = options;
    const include = [];
    if (receivedMsg) {
      include.push(User._getReceivedMsgIncludes(db));
    }
    if (sentMsg) {
      include.push(User._getSentMsgIncludes(db));
    }
    return include;
  }

  static async create(db, user) {
    const userRecord = await db.User.create(user);
    return userRecord;
  }

  static async get(db, userId, options = {}) {
    const { exclude = [] } = options;
    const userRecord = await db.User.findOne({
      where: {
        id: userId,
      },
      attributes: { exclude },
      include: User._getIncludes(options, db),
    });
    return userRecord;
  }

  static async update(db, userId, user) {
    const userRecord = await db.User.update(user, {
      where: {
        id: userId,
      },
      returning: true,
    });
    return userRecord;
  }

  static async delete(db, userId) {
    const result = await db.User.destroy({
      where: {
        id: userId,
      },
    });
    return result;
  }
}

module.exports = User;
