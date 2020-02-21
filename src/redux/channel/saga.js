// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse, processPutSuccessResponse} from '../../helpers/applicationUtils';

import {
    LOAD_CHANNEL_SUCCESS,    
    LOAD_CHANNEL_FAILED,
    LOAD_CHANNEL,
     ONCLICK_MODAL,
    TOGGLE_CHANNEL_MODAL,
    SAVE_CHANNEL
} from '../../constants/actionTypes';
import appSettings from '../../App.Settings';
import {
    loadChannelSuccess,
    toggleChannelModal,
    saveChannelSuccess
} from './actions';

 const onChannelSaveSuccess = {
    channelModal :{show: false,title: 'New Channel',mode : 'Add',data:   {name: '',description: '',cphoto : ''}},
    channelNotification : {notify:false, message:''}
 }


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
function* loadChannelList({payload={}}) {
    
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
            .API_PATH.CHANNEL_LIST+'/'+payload+'?CreatedByUserId='+payload, options);
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


/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* onclickModal({payload={}}) {  
    yield put(toggleChannelModal((payload)));
}

/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* saveNewChannel({payload={}}) {
    
      const {name='', description='', userId=''} = payload;
      const newChannelData= {
        "Name": name,
        "Description": description,
        "createdById" : userId
      }
    const options = {
        body: JSON.stringify(newChannelData),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        const response = yield call(fetchJSON, 
            appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.CHANNEL_SAVE,
             options);
console.log("response---->>>>",  response);
             const status  = processPutSuccessResponse(response, 'name');
              console.log("Channel Save status---", status)

             const {name=''} = response; 
        if(name !== '' || name !== null){
            let  nwChannel = Object.assign (
                {...onChannelSaveSuccess}, { channelNotification : {notify:true, message:'Channel Added Successfully'}}
            );
          
            yield put(saveChannelSuccess(nwChannel));
         }else{
             const {nonRegisteredUser = []} = response;
             let message;
             if(nonRegisteredUser.length > 0){               
                message = nonRegisteredUser[0]; 
             }else{               
                message = 'Internal server error';                 
             }
            // yield put(loginUserFailed(message));
           

         }
      //  yield put(saveChannelSuccess(processSuccessResponse(response)));
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
    yield takeEvery(LOAD_CHANNEL, loadChannelList);
}

export function* watchModalClick():any {
    yield takeEvery(ONCLICK_MODAL, onclickModal);
}

export function* watchSaveChannel():any {
    yield takeEvery(SAVE_CHANNEL, saveNewChannel);
}




function* channelSaga():any {
    yield all([
        fork(watchLoadChannel),
        fork(watchModalClick),
        fork(watchSaveChannel),
    ]);
}

export default channelSaga;