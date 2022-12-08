import * as types from './HomeActionTypes';
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case types.HOME_START:
      return {
        ...state,
        error: false,
        loading: true
      };

    case types.HOME_SUCCESS:
      return {
        ...state,
        loading: false,
        data : action.payload,
      };
    
    case types.HOME_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: "unauthorised"
      };
    case types.HOME_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
      };

    default:
      return state;
  }
};
