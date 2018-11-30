class User {
  static __getIncludes(options, db) {
    const { receivedMsg, sentMsg } = options;
    const includes = [];
    if (receivedMsg) {
      includes.push({
        model: db.User,
        as: 'Received',
      });
    }
    if (sentMsg) {
      includes.push({
        model: db.User,
        as: 'Sent',
      });
    }
    return includes;
  }

  static async create(db, user) {
    const userRecord = await db.User.create(user);
    return userRecord;
  }

  static async get(db, userId, options = {}) {
    const userRecord = await db.User.findOne({
      where: {
        id: userId,
      },
      includes: User.__getIncludes(options),
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
    await db.User.destroy({
      where: {
        id: userId,
      },
    });
  }
}

module.exports = User;
