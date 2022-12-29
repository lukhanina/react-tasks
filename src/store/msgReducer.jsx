import { addMess } from '../components/MessagesPage/MessageList/MessageList'

const initialState = {
  chats: {},
  status: false,
  error: null
}
  
export const addChat = (data) => ({
  type: 'ADD_CHAT',
  payload: data
})

export const delChat = (data) => ({
  type: 'DEL_CHAT',
  payload: data
})

export const addNewMsg = (data) => ({
  type: 'SEND_MSG',
  payload: data
})

export const loadMsg = (data) => ({
  type: 'LOAD_MSG',
  payload: data
})

export const errMsg = (data) => ({
  type: 'ERROR',
  payload: data
})

export const loading = (data) => ({
  type: 'LOADING',
  payload: data
})

export const botMiddleware = store => next => action => {
  if (action.type === 'SEND_MSG' && action.payload.msg.author.id !== 1) {
    setTimeout(() => {
      store.dispatch(addMess(action.payload.chatId))
    }, 1000) 
  }
  return next(action)
}

export const msgReducer = (state = initialState, action) => {
  const keys = Object.keys(state.chats);
  const newKeys = keys.filter(key => key !== action.payload);
  const newChats = {};
  switch (action.type) {
  case 'ADD_CHAT': 
    return {
      ...state,
      chats: {
        ...state.chats,
        ...action.payload
      }
    }
  case 'DEL_CHAT': 
    for (const key of newKeys) {
      newChats[key] = state.chats[key]
    }
    return {
      ...state,
      chats: {
        ...newChats
      }
    }
  case 'SEND_MSG': 
    return {
      ...state, 
      chats: {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messages: [
            ...state.chats[action.payload.chatId].messages, 
            action.payload.msg]
        }}
    }
  case 'LOAD_MSG': 
    return {
      ...state,
      chats: {...action.payload}
    }
  case 'ERROR':
    return {
      ...state,
      error: action.payload
    }
  case 'LOADING':
    return {
      ...state,
      status: action.payload
    }
  default:
    return state
  }
}
  