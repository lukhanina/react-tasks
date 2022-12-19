const initialState = {
  byEnter: true
};

export const byEnter = (value) => ({
  type: 'CHANGE_BY_ENTER',
  payload: value
})

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_BY_ENTER': 
    return {
      ...state,
      byEnter: action.payload
    }
  default:
    return state
  }
}
