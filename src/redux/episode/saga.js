// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse} from '../../helpers/applicationUtils';

import {
    LOAD_EPISODE_SUCCESS,    
    LOAD_EPISODE_FAILED,
    LOAD_EPISODE,
     ONCLICK_MODAL,
    TOGGLE_EPISODE_MODAL,
    SAVE_EPISODE
} from '../../constants/actionTypes';
import appSettings from '../../App.Settings';
import {
    loadEpisodeSuccess,
    toggleEpisodeModal,
    saveEpisodeSuccess
} from './actions';

 const onEpisodeSaveSuccess = {
    episodeModal :{episode: false,title: 'New Episode',mode : 'Add',data:   {name: '',description: '',cphoto : ''}},
    episodeNotification : {notify:false, message:''}
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
function* loadEpisodeList({payload={}}) {    
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
            .API_PATH.EPISODE_LIST+'/'+payload+'?CreatedByUserId='+payload, options);
        yield put(loadEpisodeSuccess(processSuccessResponse(response)));
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
    yield put(toggleEpisodeModal((payload)));
}

/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* saveNewEpisode({payload={}}) {
    
      const {name='', description='', userId=''} = payload;
      const newEpisodeData= {
        "Name": name,
        "Description": description,
        "createdById" : userId
      }
    const options = {
        body: JSON.stringify(newEpisodeData),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        const response = yield call(fetchJSON, 
            appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.CHANNEL_SAVE,
             options);

             const {name=''} = response; 
        if(name !== '' || name !== null){
            let  nwEpisode = Object.assign (
                {...onEpisodeSaveSuccess}, { episodeNotification : {notify:true, message:'Episode Added Successfully'}}
            );
          
            yield put(saveEpisodeSuccess(nwEpisode));
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
      //  yield put(saveEpisodeSuccess(processSuccessResponse(response)));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
    }
}

export function* watchLoadEpisode():any {
    yield takeEvery(LOAD_EPISODE, loadEpisodeList);
}

export function* watchModalClick():any {
    yield takeEvery(ONCLICK_MODAL, onclickModal);
}

export function* watchSaveEpisode():any {
    yield takeEvery(SAVE_EPISODE, saveNewEpisode);
}




function* episodeSaga():any {
    yield all([
        fork(watchLoadEpisode),
        fork(watchModalClick),
        fork(watchSaveEpisode),
    ]);
}

export default episodeSaga;