// @flow
import {
    LOAD_USERS,
    LOAD_USERS_FAILED,
    LOAD_USERS_SUCCESS,
    ONCLICK_MODAL,
    SAVE_USER_SUCCESS,SAVE_USER  ,SAVE_USER_FAILED,
    TOGGLE_USER_MODAL   ,
    LOAD_COMPANY_BY_USER_FOR_USER,LOAD_COMPANY_BY_USER_SUCCESS_FOR_USER,
    UPDATE_USER,UPDATE_USER_SUCCESS,
    RESET_USER_NOTIFICATION,
    LOAD_DEPARTMENT_BY_USER_FOR_USER, LOAD_DEPARTMENT_BY_USER_SUCCESS_FOR_USER
} from '../../constants/actionTypes';





export const loadUsers = (payload:{}) => ({
    type: LOAD_USERS,
    payload: payload
});

export const loadUserSuccess = (users: {}) => ({
     
    type: LOAD_USERS_SUCCESS,
    payload: users
});

export const onclickModal = (payload) => ({
    type: ONCLICK_MODAL,
    payload: payload
});

export const toggleUserModal = (payload) => ({
    type: TOGGLE_USER_MODAL,
    payload: payload
});
export const newUser  = (newUser) => ({
    type: SAVE_USER,
    payload: newUser
});

export const saveUserSuccess  = (successUpdate) => ({
    type: SAVE_USER_SUCCESS,
    payload: successUpdate
});

export const saveUserFailed  = (failUpdate) => ({
    type: SAVE_USER_FAILED,
    payload: failUpdate
});


export const loadCompanyListForUser = (payload) => ({
    type: LOAD_COMPANY_BY_USER_FOR_USER,
    payload: payload
});
export const loadCompanyListSuccessForUser = (compnaies: {}) => ({
    type: LOAD_COMPANY_BY_USER_SUCCESS_FOR_USER,
    payload: compnaies
});


export const updateUser  = (updatUser) => ({
    type: UPDATE_USER,
    payload: updatUser
});
export const updateChannelSuccess  = (updatUser) => ({
    type: UPDATE_USER_SUCCESS,
    payload: updatUser
});

export const resetUserNotification  = (resetNotification) => ({
    type: RESET_USER_NOTIFICATION,
    payload: resetNotification
});



export const loadDepartmentListForUser = (payload) => ({
    type: LOAD_DEPARTMENT_BY_USER_FOR_USER,
    payload: payload
});
export const loadDepartmentListSuccessForUser = (departments: {}) => ({
    type: LOAD_DEPARTMENT_BY_USER_SUCCESS_FOR_USER,
    payload: departments
});


