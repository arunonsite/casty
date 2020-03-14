// @flow
import {
LOAD_COMPANY_SUCCESS,
LOAD_COMPANY_FAILED,
LOAD_COMPANY,
ONCLICK_MODAL,
TOGGLE_COMPANY_MODAL,
SAVE_COMPANY_SUCCESS, SAVE_COMPANY_FAILED,SAVE_COMPANY,
UPDATE_COMPANY_SUCCESS,UPDATE_COMPANY_FAILED,UPDATE_COMPANY,
DELETE_COMPANY_SUCCESS, DELETE_COMPANY_FAILED, DELETE_COMPANY,
RESET_COMPANY_NOTIFICATION





} from '../../constants/actionTypes';

type CompanyAction = { type: string, payload: {} | string };



export const loadCompany = () => ({
    type: LOAD_COMPANY
});
export const loadCompanySuccess = (companies: {}) => ({
    type: LOAD_COMPANY_SUCCESS,
    payload: companies
});
export const onclickModal = (payload) => ({
    type: ONCLICK_MODAL,
    payload: payload
});
export const toggleCompanyModal = (payload) => ({
    type: TOGGLE_COMPANY_MODAL,
    payload: payload
});
export const newCompany  = (newCompany) => ({
    type: SAVE_COMPANY,
    payload: newCompany
});
export const saveCompanySuccess  = (successUpdate) => ({
    type: SAVE_COMPANY_SUCCESS,
    payload: successUpdate
});


export const updateCompany  = (updateCompany) => ({
    type: UPDATE_COMPANY,
    payload: updateCompany
});
export const updateCompanySuccess  = (updateCompany) => ({
    type: UPDATE_COMPANY_SUCCESS,
    payload: updateCompany
});


export const resetCompanyNotification  = (resetNotification) => ({
    type: RESET_COMPANY_NOTIFICATION,
    payload: resetNotification
});




export const deleteCompany  = (deleteChananl) => ({
    type: DELETE_COMPANY,
    payload: deleteChananl
});
export const deleteCompanySuccess  = (deleteChananl) => ({
    type: DELETE_COMPANY_SUCCESS,
    payload: deleteChananl
});
