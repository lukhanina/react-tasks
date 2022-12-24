const initialState = {
  byEnter: true
};

export const byEnter = () => ({
  type: 'CHANGE_BY_ENTER'
})

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_BY_ENTER': 
    return {
      ...state,
      byEnter: !state.byEnter
    }
  default:
    return state
  }
}
