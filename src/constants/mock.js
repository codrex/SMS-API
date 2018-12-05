const { STATUS } = require('./values');

const USER_ONE = { phoneNumber: '09049489039', name: 'mark doe' };
const USER_TWO = { phoneNumber: '09040004039', name: 'john doe' };

function createMessageMock(senderId, receiverId) {
  return {
    text: 'very long message',
    senderId,
    receiverId,
    status: STATUS.UNREAD,
  };
}

function createUserMock() {
  const phoneNumber = `${Date.now()}090`
    .split('')
    .reverse()
    .slice(0, 10)
    .join('');
  return { phoneNumber, name: 'mark doe' };
}

module.exports = {
  USER_ONE,
  USER_TWO,
  createMessageMock,
  createUserMock,
};
