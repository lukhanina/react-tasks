import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MessageList } from './MessageList';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const configureMockStore = configureStore();

const initialState = {
  msg: {
    chats: {
      1: {
        avatar: 'https://github.com/lukhanina/react-tasks/blob/task8/src/components/MainPage/ChatList/avatar/robot.png?raw=true',
        contactName: 'Bot',
        messages: [
          {
            author: {
              id: 1,
              name: 'Bot'
            },
            date: '9/12/2022',
            id: '1_1',
            text: "I'm robot",
            time: '09:30',
            type: 'received'
          },
          {
            author: {
              id: 2,
              name: 'Anna Lukhanina'
            },
            date: '19/12/2022',
            id: '1_2',
            text: 'Hi',
            time: '10:41',
            type: 'sent'
          },
          {
            author: {
              id: 1,
              name: 'Bot'
            },
            date: '19/12/2022',
            id: '1_3',
            text: "I'm Bot",
            time: '10:41',
            type: 'received'
          }
        ]
      },
      2: {
        avatar: 'https://github.com/lukhanina/react-tasks/blob/task8/src/components/MainPage/ChatList/avatar/girl.jpg?raw=true',
        contactName: 'Bestfriend',
        messages: [
          {
            author: {
              id: 3,
              name: 'Bestfriend'
            },
            date: '09/12/2022',
            id: '2_1',
            text: 'Hi you!',
            time: '10:00',
            type: 'received'
          },
          {
            author: {
              id: 2,
              name: 'Anna Lukhanina'
            },
            date: '16/12/2022',
            id: '2_2',
            text: 'How are you?',
            time: '12:48',
            type: 'sent'
          },
          {
            author: {
              id: 1,
              name: 'Bot'
            },
            date: '16/12/2022',
            id: '2_3',
            text: "I'm Bot",
            time: '18:09',
            type: 'received'
          }
        ]
      },
      3: {
        avatar: '',
        contactName: 'Svetlana',
        messages: [
          '',
          {
            author: {
              id: 1,
              name: 'Bot'
            },
            date: '1/6/2023',
            id: '3_2',
            text: "I'm Bot",
            time: '20:00',
            type: 'received'
          },
          {
            author: {
              id: 2,
              name: 'Anna Lukhanina'
            },
            date: '1/6/2023',
            id: '3_3',
            text: 'Hi',
            time: '20:00',
            type: 'sent'
          }
        ]
      }
    }
  },
  profile: {
    byEnter: true,
    isAuth: false
  }
}

const store = configureMockStore(initialState);

describe('MessageList testing', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MessageList />
      </Provider>)
  });
})
