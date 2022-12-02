import * as types from './LinkActionTypes';
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case types.LINK_START:
      return {
        ...state,
        error: false,
        loading: true
      };

    case types.LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        data : action.payload,
      };
    
    case types.LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        logged_in : false,
        user : "",
        errResponse: "unauthorised"
      };
    case types.LINK_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
        token: null,
        user: null
      };

    default:
      return state;
  }
};
