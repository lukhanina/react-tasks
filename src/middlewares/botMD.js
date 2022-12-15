import { SEND, send } from '../store/actions/msg_action';

export default store => next => action => {
  switch (action.type) {
  case SEND:
    const chatId = action.chatId;
    const msgLength = store.getState().msgReducer[chatId].messages.length;
    if (action.payload.author.id === 2) {
      setTimeout(() => {
        return store.dispatch(send(chatId, msgLength + 1))
      }, 1000)
    } 
  }
  return next(action)
}
