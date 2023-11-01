import * as types from "./actionTypes";

const initialState = {

    isLoginSuccess:false,
    isLoginProcess:false,
    isLoginFail:false,
    isLoginMessage:"",

    isSignupSuccess:false,
    isSignupProcess:false,
    isSignupFail:false,
    isSignupMessage:"",

};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.USER_LOGIN_PROCESS:
      return {
        ...state,
        isLoginSuccess:false,
        isLoginProcess:true,
        isLoginFail:false,
        isLoginMessage:"",
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess:true,
        isLoginProcess:false,
        isLoginFail:false,
        isLoginMessage:payload.message,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoginSuccess:false,
        isLoginProcess:false,
        isLoginFail:true,
        isLoginMessage:payload,
      };
    case types.USER_SIGNUP_PROCESS:
      return {
        ...state,
        isSignupSuccess:false,
        isSignupProcess:true,
        isSignupFail:false,
        isSignupMessage:"",
      };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isSignupSuccess:true,
        isSignupProcess:false,
        isSignupFail:false,
        isSignupMessage:payload.message,
      };
    case types.USER_SIGNUP_FAILURE:
      return {
        ...state,
        isSignupSuccess:false,
        isSignupProcess:false,
        isSignupFail:true,
        isSignupMessage:payload,
      };
    default:
      return state;
  }
};
