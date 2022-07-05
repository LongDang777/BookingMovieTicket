


const stateDefault = {
  isLoading: false
}

export const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case 'DISPLAY_lOADING':
      {
        state.isLoading = true;
        return { ...state }
      }
    case 'HIDDEN_lOADING':
      {
        state.isLoading = false;
        return { ...state }
      }
    default:
      return state
  }
}
