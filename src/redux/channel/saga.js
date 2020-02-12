// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse} from '../../helpers/applicationUtils';

import {
    LOAD_CHANNEL_SUCCESS,    
    LOAD_CHANNEL_FAILED,
    LOAD_CHANNEL
} from '../../constants/actionTypes';


import appSettings from '../../App.Settings';

import {
    loadChannelSuccess
} from './actions';


/**
 * Fetch data from given url
 * @param {*} url 
 * @param {*} options 
 */
const fetchJSON = (url, options = {}) => {
    return fetch(url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => { throw error });
}


/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* loadChannelList() {
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.GET_COMPANIES_LIST, options);
         console.log("response==", response);
 
        yield put(loadChannelSuccess(processSuccessResponse(response)));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
    }
}




export function* watchLoadChannel():any {
     console.log("AKJ");
    yield takeEvery(LOAD_CHANNEL, loadChannelList);
}



function* channelSaga():any {
    yield all([
        fork(watchLoadChannel),
    ]);
}

export default channelSaga;