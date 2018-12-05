class User {
  static __getIncludes(options, db) {
    const { receivedMsg, sentMsg } = options;
    const include = [];
    if (receivedMsg) {
      include.push({
        model: db.Message,
        as: 'receivedMessages',
      });
    }
    if (sentMsg) {
      include.push({
        model: db.Message,
        as: 'sentMessages',
      });
    }
    return include;
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
      include: User.__getIncludes(options, db),
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
