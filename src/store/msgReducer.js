const initialState = {};
  
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
      ...state,
      ...action.payload
    }
  case 'DEL_CHAT': 
    delete state[action.payload]
    return {
      ...state
    }
  case 'SEND_MSG': 
    return {
      ...state, 
      [action.payload.chatId]: {
        messages: [...state[action.payload.chatId].messages, action.payload.msg]
      }
    }
  case 'LOAD_MSG': 
    return {
      ...state,
      ...action.payload
    }
  default:
    return state
  }
}
  