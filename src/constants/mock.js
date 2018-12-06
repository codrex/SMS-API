const pushid = require('pushid');

const USER_ONE = { phoneNumber: '09049489039', name: 'mark doe', id: 'one' };
const USER_TWO = { phoneNumber: '09040004039', name: 'john doe', id: 'two' };

function createMessageMock(senderId, receiverId) {
  return {
    text: 'very long message',
    senderId,
    receiverId,
    id: pushid(),
  };
}

function createUserMock() {
  const phoneNumber = `${Date.now()}090`
    .split('')
    .reverse()
    .slice(0, 10)
    .join('');
  return { phoneNumber, name: 'mark doe', id: pushid() };
}

module.exports = {
  USER_ONE,
  USER_TWO,
  createMessageMock,
  createUserMock,
};
