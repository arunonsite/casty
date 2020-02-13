// @flow
import {
    LOAD_USERS,
    LOAD_USERS_FAILED,
    LOAD_USERS_SUCCESS
} from '../../constants/actionTypes';





export const loadUsers = (companyId) => ({
    type: LOAD_USERS,
    payload: companyId
});

export const loadUserSuccess = (users: {}) => ({
     
    type: LOAD_USERS_SUCCESS,
    payload: users
});

