const User = require('../User');
const db = require('../../../db/models');

describe('User model repo', () => {
  describe('create', () => {
    it('should create user record', async () => {
      const userData = { phoneNumber: '09049484039', name: 'jone doe' };
      const userRecord = await User.create(db, userData);
      expect(userRecord.phoneNumber).toBe(userData.phoneNumber);
      expect(userRecord.name).toBe(userData.name);
    });
  });

  describe('update', () => {
    it('should update user record', async () => {
      const userData = { phoneNumber: '09049304039', name: 'jone doe' };
      let userRecord = await User.create(db, userData);
      userRecord = await User.update(db, userRecord.id, {
        name: 'mary doe',
      });
      expect(userRecord[1][0].name).toBe('mary doe');
      expect(userRecord[0]).toBe(1);
    });
  });

  describe('get', () => {
    it('should get user record', async () => {
      const userData = { phoneNumber: '09000304039', name: 'jone doe' };
      let userRecord = await User.create(db, userData);
      userRecord = await User.get(db, userRecord.id);
      expect(userRecord.phoneNumber).toBe(userData.phoneNumber);
      expect(userRecord.name).toBe(userData.name);
    });
  });
});
