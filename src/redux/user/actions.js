// @flow
import {
    LOAD_USERS,
    LOAD_USERS_FAILED,
    LOAD_USERS_SUCCESS,
    ONCLICK_MODAL,
    SAVE_USER_SUCCESS,SAVE_USER  ,SAVE_USER_FAILED,
    TOGGLE_USER_MODAL   
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

