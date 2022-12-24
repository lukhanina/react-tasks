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

export const addNewMsgWithReply = (chatId, name, id, text, mesType) => (dispatch) => {
  return fetch('/api/postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({chatId, name, id, text, mesType})
  })
    .then((response) => {
      if (!response.ok) {
        alert(`Network response was not OK, error ${response.status}`)
      }
      return response.json()})
    .then((msg) => {
      dispatch(addNewMsg({msg, chatId}))
      if (msg.author.id === 2) {
        const timer = setTimeout(() => {
          fetch('/api/postMessage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({chatId})
          })
            .then((response) => {
              return response.json()})
            .then((msg) => {
              dispatch(addNewMsg({msg, chatId}))
            })}, 1000)}
    })
}
  
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
  