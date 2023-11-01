import axios from "axios";
import * as types from "./actionTypes";

const END_POINT = "https://todo-6odt.onrender.com"


// jwtToken
const jwtToken = () => {
    const userData = JSON.parse(localStorage.getItem("Todo-application-jwt"));
    return "Bearer " + String(userData.token);
};

// create tasks
const createTask = (data) => async (dispatch) => {
    dispatch({ type: types.CREATE_TASK_PROCESS });
    try {
        const res = await axios.post(`${END_POINT}/todo/create`, data, {
            headers: {
                Authorization: jwtToken()
            }
        });

        dispatch({ type: types.CREATE_TASK_SUCCESS, payload: res.data });
    } catch (err) {

        dispatch({ type: types.CREATE_TASK_FAIL, payload: err.response.data.error });
    }
}

// get all tasks
const getAllTasks = () => async (dispatch) => {

    dispatch({ type: types.GET_ALL_TASKS_PROCESS });
    try {
        const res = await axios.get(`${END_POINT}/todo/get/all`, {
            headers: {
                Authorization: jwtToken()
            }
        });
        dispatch({ type: types.GET_ALL_TASKS_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: types.GET_ALL_TASKS_FAIL, payload: err.response.data.error });
    }
}

// get single tasks
const getSingleTask = (ID) => async (dispatch) => {
    dispatch({ type: types.GET_SINGLE_TASK_PROCESS });
    try {
        const res = await axios.get(`${END_POINT}/todo/get/${ID}`, {
            headers: {
                Authorization: jwtToken()
            }
        });
        dispatch({ type: types.GET_SINGLE_TASK_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: types.GET_SINGLE_TASK_FAIL, payload: err.response.data.error });
    }
}

// update task
const updateTask = (ID, status) => async (dispatch) => {
    dispatch({ type: types.UPDATE_TASK_PROCESS });
    try {
        const res = await axios.put(`${END_POINT}/todo/update/${ID}`, { status: status }, {
            headers: {
                Authorization: jwtToken()
            }
        });
        dispatch({ type: types.UPDATE_TASK_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: types.UPDATE_TASK_FAIL, payload: err.response.data.error });
    }
}

// delete task
const deleteTask = (ID) => async (dispatch) => {
    dispatch({ type: types.DELETE_TASK_PROCESS });
    try {
        const res = await axios.delete(`${END_POINT}/todo/delete/${ID}`, {
            headers: {
                Authorization: jwtToken()
            }
        });
        dispatch({ type: types.DELETE_TASK_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: types.DELETE_TASK_FAIL, payload: err.response.data.error });
    }
}

export { createTask, getAllTasks, getSingleTask, updateTask, deleteTask };