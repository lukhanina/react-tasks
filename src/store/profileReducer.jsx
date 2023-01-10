const initialState = {
  byEnter: true,
  isAuth: false
};

export const byEnter = () => ({
  type: 'CHANGE_BY_ENTER'
})

export const setAuth = (data) => ({
  type: 'SET_AUTH',
  payload: data
})

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_BY_ENTER': 
    return {
      ...state,
      byEnter: !state.byEnter
    }
  case 'SET_AUTH': 
    return {
      ...state,
      isAuth: action.payload
    }
  default:
    return state
  }
}
