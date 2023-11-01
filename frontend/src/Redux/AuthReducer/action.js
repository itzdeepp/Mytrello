import axios from "axios";
import * as types from "./actionTypes";

const END_POINT = "https://todo-6odt.onrender.com"


// signup function
const signUp = (userInput)  => async (dispatch) => {
  dispatch({ type: types.USER_SIGNUP_PROCESS });

  try {
    const res = await axios.post(`${END_POINT}/user/signup`, userInput);
      dispatch({ type: types.USER_SIGNUP_SUCCESS, payload:res.data });

    } catch (err) {

      dispatch({ type: types.USER_SIGNUP_FAILURE, payload:err.response.data.error });
  }
};


// login function
const login =  (userInput)  => async (dispatch) => {
  dispatch({ type: types.USER_LOGIN_PROCESS });
  
  try {
    const res = await axios.post(`${END_POINT}/user/login`, userInput);
 
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("Todo-application-jwt", JSON.stringify(res.data.data))
  } catch (err) {

    dispatch({
      type: types.USER_LOGIN_FAILURE,
      payload: err.response.data.error,
    });
  }
};



export { signUp, login };
