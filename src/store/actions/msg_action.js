export const SEND = '@@message/SEND';

export const SUCCESS_LOAD_MSGS = '@@message/SUCCESS_LOAD_MSGS';

export let loadChats = () => {
  return (dispatch) => {
    return fetch('/api/getMessages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert(`Network response was not OK, error ${response.status}`)
        }
        return response.json()})
      .then((data) => {
        dispatch({
          type: SUCCESS_LOAD_MSGS,
          payload: data
        })
      })
  }
}

export let send = (chatId, mesId, name, id, text, mesType) => ({
  type: SEND,
  payload: {
    author: {
      name: name || 'Bot',
      id: id || 1
    },
    id: `${chatId}_${mesId}`,
    text: text || 'I\'m Bot',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString('en-GB').substring(0, 5),
    type: mesType || 'received'
  },
  chatId: chatId
})

