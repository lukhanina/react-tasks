export const initialState = {
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
  switch (action.type) {
  case 'ADD_CHAT': 
    return {
      chats: {
        ...state.chats,
        ...action.payload
      }
    }
  case 'DEL_CHAT': 
    delete state.chats[action.payload];
    return {
      ...state
    }
  case 'SEND_MSG': 
    state.chats[action.payload.chatId].messages.push(action.payload.newMsg)
    return {
      ...state
    }
  case 'LOAD_MSG': 
    return {
      chats: {...action.payload}
    }
  default:
    return state
  }
}
  