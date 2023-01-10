import { msgReducer, initialState, addNewMsg, addChat, delChat, loadMsg } from './msgReducer';

describe('msg reducer', () => {
  it('should return the initial state', () => {
    expect(msgReducer(undefined, {})).toEqual({chats: {}})
  });
  it('should handle ADD_CHAT', () => {
    const newChat = {
      newChatKey: {
        avatar: '',
        contactName: 'Hanna',
        messages: ['']
      }};
    expect(msgReducer({chats: {}}, addChat(newChat))).toEqual({chats: newChat});
  });
  it('should handle DEL_CHAT', () => {
    expect(msgReducer({chats: {
      1: {
        avatar: '',
        contactName: 'Svetlana',
        messages: ['']
      }
    }}, delChat(1))).toEqual({chats: {}});
  });
  it('should handle LOAD_MSG', () => {
    const chats = {
      1: {
        avatar: '',
        contactName: 'Hanna',
        messages: ['']
      }};
    expect(msgReducer({initialState}, loadMsg(chats))).toEqual({chats: chats});
  });
  it('should handle SEND_MSG', () => {
    const msgData = {
      chatId: 1,
      newMsg: {
        author: {
          name: "Anna Ivanova",
          id: 1
        },
        id: "1_1",
        text: "Hi, how are you?",
        date: "1/6/2023",
        time: "20:10",
        type: "sent"
      }
    }
    expect(msgReducer({chats: {
      1: {
        avatar: '',
        contactName: 'Svetlana',
        messages: ['']
      }
    }}, addNewMsg(msgData))).toEqual({chats: {1: {
      avatar: '',
      contactName: 'Svetlana',
      messages: ['', {
        author: {
          name: "Anna Ivanova",
          id: 1
        },
        id: "1_1",
        text: "Hi, how are you?",
        date: "1/6/2023",
        time: "20:10",
        type: "sent"
      }]
    }}});
  });
});
