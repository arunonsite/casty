// @flow
import {
    TOGGLE_DEPARTMENT_MODAL , ONCLICK_DEPARTMENT_MODAL,
    SAVE_DEPARTMENT_SUCCESS,SAVE_DEPARTMENT  ,SAVE_DEPARTMENT_FAILED,
    LOAD_COMPANY_BY_DEPARTMENT_FOR_DEPARTMENT,LOAD_COMPANY_BY_DEPARTMENT_SUCCESS_FOR_DEPARTMENT,
    UPDATE_DEPARTMENT,UPDATE_DEPARTMENT_SUCCESS,
    RESET_DEPARTMENT_NOTIFICATION
} from '../../constants/actionTypes';



;

export const loadCompanyListForDepartmentSuccess = (companies: {}) => ({
    type: LOAD_COMPANY_BY_DEPARTMENT_SUCCESS_FOR_DEPARTMENT,
    payload: companies
});


export const onclickModal = (payload) => ({
    type: ONCLICK_DEPARTMENT_MODAL,
    payload: payload
});

export const toggleDepartmentModal = (payload) => ({
    type: TOGGLE_DEPARTMENT_MODAL,
    payload: payload
});
export const newDepartment  = (newDepartment) => ({
    type: SAVE_DEPARTMENT,
    payload: newDepartment
});

export const saveDepartmentSuccess  = (successUpdate) => ({
    type: SAVE_DEPARTMENT_SUCCESS,
    payload: successUpdate
});

export const saveDepartmentFailed  = (failUpdate) => ({
    type: SAVE_DEPARTMENT_FAILED,
    payload: failUpdate
});


export const loadCompanyListForDepartment = (payload) => ({
    type: LOAD_COMPANY_BY_DEPARTMENT_FOR_DEPARTMENT,
    payload: payload
});
export const loadCompanyListSuccessForDepartment = (compnaies: {}) => ({
    type: LOAD_COMPANY_BY_DEPARTMENT_SUCCESS_FOR_DEPARTMENT,
    payload: compnaies
});


export const updateDepartment  = (updatDepartment) => ({
    type: UPDATE_DEPARTMENT,
    payload: updatDepartment
});
export const updateChannelSuccess  = (updatDepartment) => ({
    type: UPDATE_DEPARTMENT_SUCCESS,
    payload: updatDepartment
});

export const resetDepartmentNotification  = (resetNotification) => ({
    type: RESET_DEPARTMENT_NOTIFICATION,
    payload: resetNotification
});

