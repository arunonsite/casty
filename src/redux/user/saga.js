// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse, fetchJSON} from '../../helpers/applicationUtils';

import {
    LOAD_USERS,
    LOAD_USERS_FAILED,
    LOAD_USERS_SUCCESS
} from '../../constants/actionTypes';


import appSettings from '../../App.Settings';

import {
    loadUserSuccess
} from './actions';



/**
 * Load the user list
 * @param {*} payload - username and password 
 */
function* loadUserListByCompany({payload}) {
   
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.GET_USER_LIST_BYCOMPANY_ROUTE+'/'+payload, options);
        yield put(loadUserSuccess(processSuccessResponse(response)));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
    }
}




export function* watchLoadUser():any {
    yield takeEvery(LOAD_USERS, loadUserListByCompany);
}



function* userSaga():any {
    yield all([
        fork(watchLoadUser),
    ]);
}

export default userSaga;