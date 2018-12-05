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
  return { phoneNumber: `090${Date.now()}`, name: 'mark doe' };
}

module.exports = {
  USER_ONE,
  USER_TWO,
  createMessageMock,
  createUserMock,
};
