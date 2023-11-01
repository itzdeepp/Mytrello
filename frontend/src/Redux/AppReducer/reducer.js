import * as types from "./actionTypes";

const initialState = {

    taskCreatingProcess: false,
    taskCreatingSuccess: false,
    taskCreatingFail: false,
    taskCreatingMessage: "",
    taskCreated: {},

    getAllTasksProcessing: false,
    getAllTasksSuccess: false,
    getAllTasksFail: false,
    allTasks: [],
    getAllTasksMessage: "",

    getSingleTaskProcessing: false,
    getSingleTaskSuccess: false,
    getSingleTaskFail: false,
    singleTask: {},
    getSingleTaskMessage: "",

    updateTaskProcessing: false,
    updateTaskSuccess: false,
    updateTaskFail: false,
    updateTaskMessage: "",
    updateTask: {},

    deleteTaskProcessing: false,
    deleteTaskSuccess: false,
    deleteTaskFail: false,
    deleteTaskMessage: "",
    deleteTask: {},

};

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.GET_ALL_TASKS_PROCESS:
            return {
                ...state,
                getAllTasksProcessing: true,
                getAllTasksSuccess: false,
                getAllTasksFail: false,
                allTasks: [],
                getAllTasksMessage: "",
            };
        case types.GET_ALL_TASKS_SUCCESS:
            return {
                ...state,
                getAllTasksProcessing: false,
                getAllTasksSuccess: true,
                getAllTasksFail: false,
                allTasks: payload.data,
                getAllTasksMessage: payload.message,
            };
        case types.GET_ALL_TASKS_FAIL:
            return {
                ...state,
                getAllTasksProcessing: false,
                getAllTasksSuccess: false,
                getAllTasksFail: true,
                allTasks: [],
                getAllTasksMessage: "",
            };

        case types.GET_SINGLE_TASK_PROCESS:
            return {
                ...state,
                getSingleTaskProcessing: true,
                getSingleTaskSuccess: false,
                getSingleTaskFail: false,
                singleTask: {},
                getSingleTaskMessage: "",
            };
        case types.GET_SINGLE_TASK_SUCCESS:
            return {
                ...state,
                getSingleTaskProcessing: false,
                getSingleTaskSuccess: true,
                getSingleTaskFail: false,
                singleTask: payload.data,
                getSingleTaskMessage: payload.message,
            };
        case types.GET_SINGLE_TASK_FAIL:
            return {
                ...state,
                getSingleTaskProcessing: false,
                getSingleTaskSuccess: false,
                getSingleTaskFail: true,
                singleTask: {},
                getSingleTaskMessage: "",
            };

        case types.CREATE_TASK_PROCESS:
            return {
                ...state,
                taskCreatingProcess: true,
                taskCreatingSuccess: false,
                taskCreatingFail: false,
                taskCreatingMessage: "",
                taskCreated: {}
            };
        case types.CREATE_TASK_SUCCESS:
            return {
                ...state,
                taskCreatingProcess: false,
                taskCreatingSuccess: true,
                taskCreatingFail: false,
                taskCreatingMessage: payload.message,
                taskCreated: payload.data
            };
        case types.CREATE_TASK_FAIL:
            return {
                ...state,
                taskCreatingProcess: false,
                taskCreatingSuccess: false,
                taskCreatingFail: true,
                taskCreatingMessage: payload,
                taskCreated: {}
            };

        case types.UPDATE_TASK_PROCESS:
            return {
                ...state,
                updateTaskProcessing: true,
                updateTaskSuccess: false,
                updateTaskFail: false,
                updateTaskMessage: "",
                updateTask: {},
            };
        case types.UPDATE_TASK_SUCCESS:
            return {
                ...state,
                updateTaskProcessing: false,
                updateTaskSuccess: true,
                updateTaskFail: false,
                updateTaskMessage: payload.message,
                updateTask: payload.data,
            };
        case types.UPDATE_TASK_FAIL:
            return {
                ...state,
                updateTaskProcessing: false,
                updateTaskSuccess: false,
                updateTaskFail: true,
                updateTaskMessage: "",
                updateTask: {},
            };

        case types.DELETE_TASK_PROCESS:
            return {
                ...state,
                deleteTaskProcessing: true,
                deleteTaskSuccess: false,
                deleteTaskFail: false,
                deleteTaskMessage: "",
                deleteTask: {},
            };
        case types.DELETE_TASK_SUCCESS:
            return {
                ...state,
                deleteTaskProcessing: false,
                deleteTaskSuccess: true,
                deleteTaskFail: false,
                deleteTaskMessage: payload.message,
                deleteTask: payload.data,
            };
        case types.DELETE_TASK_FAIL:
            return {
                ...state,
                deleteTaskProcessing: false,
                deleteTaskSuccess: false,
                deleteTaskFail: true,
                deleteTaskMessage: "",
                deleteTask: {},
            };
        default:
            return state;
    }
};
