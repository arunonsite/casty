// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse } from '../../helpers/applicationUtils';

import {
    LOAD_DASHBOARD,
    LOAD_DASHBOARD_SUCCESS 
} from '../../constants/actionTypes';
import appSettings from '../../App.Settings';
import {
    loadDashbaordSuccess 
} from './actions';

//https://casty.azurewebsites.net/api/Shows/Delete?ShowID=a4a3b628-32e4-42aa-a124-08d7b830efc6&UserID=6fdd16f5-2b43-4e40-b59f-e0a1933cc744

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
        .catch(error => {
            return { error: error };
        });
}


/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* loadDashboardData({ payload = {} }) {
    const { id, companyID, currentUsrAccess, channelId = undefined, } = payload;
     console.log("payload---", payload);
    const options = {
        body: JSON.stringify(payload),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    try {

        let url = appSettings.API_ROUTE.MAIN_SITE;
        url += "api/Statistics/GetStatistics/AllCompanies/Day"

         console.log("response----", response);

        
        const response = yield call(fetchJSON, url, options);

        if (response.data) {
            yield put(loadDashbaordSuccess(processSuccessResponse(response)));
        } else {
            yield put(loadDashbaordSuccess(processSuccessResponse({ data: response })));
        }



    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
    }
}


export function* watchLoadDashboard(): any {
    yield takeEvery(LOAD_DASHBOARD, loadDashboardData);
}


function* showSaga(): any {
    yield all([
        fork(watchLoadDashboard),
    ]);
}

export default showSaga;