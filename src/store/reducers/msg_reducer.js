import update from 'react-addons-update';
import { SEND, SUCCESS_LOAD_MSGS } from '../actions/msg_action';
import '../../components/containers/ChatList/static/images/avatar/robot.png'
import '../../components/containers/ChatList/static/images/avatar/girl.jpg'
const initStore = {};

export function msgReducer(store = initStore, action) {
  switch (action.type) {
  case SEND:
    return update(store, {
      [action.chatId]: {
        messages: {
          $push: [action.payload]
        }
      }
    });
  case SUCCESS_LOAD_MSGS:
    return update(store, {
      $merge: {
        ...action.payload
      }
    }
    );
  default:
    return store
  }
}
