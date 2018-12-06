const joi = require('joi');

const { user, message } = require('../schema');
const { createUserMock, createMessageMock } = require('../../../constants');

describe('schema', () => {
  describe('user', () => {
    it('should not throw an error', () => {
      expect(() => joi.assert(createUserMock(), user)).not.toThrowError();
    });

    it('should throw an error', () => {
      expect(() => joi.assert({}, user)).toThrowError();
    });
    //  PHONE NUMBER ========================================================

    it('should throw an error when number does not have a length of 10', () => {
      const data = createUserMock();
      data.phoneNumber = '123456789';
      expect(() => joi.assert(data, user)).toThrowError();
    });

    it('should throw an error when number has letter or special character', () => {
      const data = createUserMock();
      data.phoneNumber = '123456789o';
      expect(() => joi.assert(data, user)).toThrowError();
    });

    it('should throw an error when number is empty string', () => {
      const data = createUserMock();
      data.phoneNumber = '      ';
      expect(() => joi.assert(data, user)).toThrowError();
      data.phoneNumber = '';
      expect(() => joi.assert(data, user)).toThrowError();
    });

    //  NAME========================================================

    it('should throw an error when is not a string', () => {
      const data = createUserMock();
      data.name = 2334;
      expect(() => joi.assert(data, user)).toThrowError();
    });

    it('should throw an error when contains numbers or special characters other than space', () => {
      const data = createUserMock();
      data.name = 'test_user';
      expect(() => joi.assert(data, user)).toThrowError();
    });

    it('should pass when contains space', () => {
      const data = createUserMock();
      data.name = 'test user';
      expect(() => joi.assert(data, user)).not.toThrowError();
    });
  });

  describe('message', () => {
    it('should not throw an error', () => {
      expect(() => joi.assert(createMessageMock(1, 3), message)).not.toThrowError();
    });
    //  TEXT ========================================================

    it('should throw an error when text is not a string', () => {
      const data = createMessageMock(1, 2);
      data.text = 1234;
      expect(() => joi.assert(data, message)).toThrowError();
    });

    it('should throw an error when text empty', () => {
      const data = createMessageMock(1, 2);
      data.text = '      ';
      expect(() => joi.assert(data, message)).toThrowError();
      data.text = '';
      expect(() => joi.assert(data, message)).toThrowError();
    });

    // //  STATUS========================================================

    it('should throw an error when status is not a string', () => {
      const data = createMessageMock(1, 2);
      data.status = 1234;
      expect(() => joi.assert(data, message)).toThrowError();
    });

    it('should throw an error when status is invalid', () => {
      const data = createMessageMock(1, 2);
      data.status = 'LOADING';
      expect(() => joi.assert(data, message)).toThrowError();
    });

    // //  SENDER ID========================================================

    it('should throw an error when sender id is not present', () => {
      const data = createMessageMock(undefined, 2);
      expect(() => joi.assert(data, message)).toThrowError();
    });

    it('should throw an error when sender id is not a number', () => {
      const data = createMessageMock('123kfk', 2);
      expect(() => joi.assert(data, message)).toThrowError();
    });

    // //  RECEIVER========================================================
    it('should throw an error when receiver id is not present', () => {
      const data = createMessageMock(4, undefined);
      expect(() => joi.assert(data, message)).toThrowError();
    });

    it('should throw an error when receiver id is not a number', () => {
      const data = createMessageMock(3, '123kfk');
      expect(() => joi.assert(data, message)).toThrowError();
    });
  });
});
