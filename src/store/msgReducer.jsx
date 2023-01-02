const initialState = {
  chats: {},
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

export const msgReducer = (state = initialState, action) => {
  const keys = Object.keys(state.chats);
  const newKeys = keys.filter(key => key !== action.payload);
  const newChats = {};
  switch (action.type) {
  case 'ADD_CHAT': 
    return {
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
      chats: {
        ...newChats
      }
    }
  case 'SEND_MSG': 
    return {
      chats: {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messages: [
            ...state.chats[action.payload.chatId].messages, 
            action.payload.newMsg]
        }}
    }
  case 'LOAD_MSG': 
    return {
      chats: {...action.payload}
    }
  default:
    return state
  }
}
  