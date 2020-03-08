// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse, processPutSuccessResponse} from '../../helpers/applicationUtils';

import {
    LOAD_EPISODE_SUCCESS,    
    LOAD_EPISODE_FAILED,
    LOAD_EPISODE,
    ONCLICK_EPISODE_MODAL,
    TOGGLE_EPISODE_MODAL,
    SAVE_EPISODE,
    UPDATE_EPISODE_SUCCESS,UPDATE_EPISODE_FAILED,UPDATE_EPISODE,
    DELETE_EPISODE_SUCCESS, DELETE_EPISODE_FAILED, DELETE_EPISODE,
    SEARCH_EPISODE, SEARCH_EPISODE_SUCCESS
} from '../../constants/actionTypes';
import appSettings from '../../App.Settings';
import {    
    loadEpisodeSuccess,
    toggleEpisodeModal,
    saveEpisodeSuccess,
    updateEpisodeSuccess,
    deleteEpisodeSuccess,
    searchEpisodeSuccess
} from './actions';

 const onEpisodeSaveSuccess = {
    episodeModal :{show: false,title: 'New Episode',mode : 'Add',data:   {name: '',description: '',cphoto : ''}},
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
        let dd  ='02edf7a0-3c61-4b4c-a63c-c10abc88dae9';
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
            .API_PATH.EPISODE_LIST+'/'+payload.showId, options);
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
    
      const {name='', description='', UserId=''} = payload;
      const newEpisodeData= {
        ...payload ,
        "Name": name,
        "Description": description,
        "createdById" : UserId
      }
    const options = {
        body: JSON.stringify(newEpisodeData),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const response = yield call(fetchJSON, 
            appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.EPISODE_SAVE+'?UserId='+UserId,
             options);


             const status  = processPutSuccessResponse(response, 'name');
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


/**
 * Updating the selected Episode
 * @param {*} payload - username and password 
 */
function* updateEpisode({payload={}}) {
    
    const {name='', description='', id='',UserId=''} = payload;
    const updateEpisodeData= {
        ...payload ,
      "Name": name,
      "Description": description,
      "Id" : id
    }
  const options = {
      body: JSON.stringify(updateEpisodeData),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {
      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.EPISODE_UPDATE+"?UserId="+UserId,
           options);
           const status  = processPutSuccessResponse(response, 'name');
           const {name=''} = response; 
      if(name !== '' || name !== null){
          let  nwEpisode = Object.assign (
              {...onEpisodeSaveSuccess}, { episodeNotification : {notify:true, message:'Episode Updated Successfully'}}
          );          
          yield put(updateEpisodeSuccess(nwEpisode));
       }else{
           const {nonRegisteredUser = []} = response;
           let message;
           if(nonRegisteredUser.length > 0){               
              message = nonRegisteredUser[0]; 
           }else{               
              message = 'Internal server error';                 
           }
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


/**
 * Updating the selected Episode
 * @param {*} payload - username and password 
 */
function* deleteEpisode({payload={}}) {
    
   
  const options = {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {
      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.EPISODE_DELETE
          +'?EpisodeID='+payload.EpisodeID+"&UserID="+payload.EpisodeID,
           options);



           const {name='', error={}} = response; 
           if(name !== '' || name !== null && error === null){
                
               let  nwShow = Object.assign (
                   {...onEpisodeSaveSuccess}, { episodeNotification : {notify:true,mode:0 ,  message:'Episode delete Successfully'}}
               );
           
               yield put(deleteEpisodeSuccess(nwShow));
            }else{        
                const {error : {message =''}} = response;
                let apiErrorMessage = 'Unable to delete show';
                if(message === ''){                             
                 apiErrorMessage = 'Unable to Updadeletete Successfully';                 
                }
     
                let  nwShow = Object.assign (
                 {...onEpisodeSaveSuccess}, { episodeNotification : {notify:true,mode:-1 ,  message:apiErrorMessage}}
             );
               // yield put(updateShowFailed(nwShow)); 


           
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

/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* searchEpisode({payload={}}) {
    

    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
            .API_PATH.EPISODE_LIST+'/'+payload.showId, options);;
             let poetFilter = payload.episodeFilter.toLowerCase();
             let episodefilterd = processSuccessResponse(response).response.filter(episode => {
                let poetName = episode.name.toLowerCase();
                return poetName.indexOf(
                  poetFilter.toLowerCase()) !== -1
              }) 
            yield put(searchEpisodeSuccess((episodefilterd)));
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
    yield takeEvery(ONCLICK_EPISODE_MODAL, onclickModal);
}

export function* watchSaveEpisode():any {
    yield takeEvery(SAVE_EPISODE, saveNewEpisode);
}

export function* watchUpdateEpisode():any {
    yield takeEvery(UPDATE_EPISODE, updateEpisode);
}

export function* watchDeleteEpisode():any {
    yield takeEvery(DELETE_EPISODE, deleteEpisode);
}

export function* watchSearchEpisode():any {
    yield takeEvery(SEARCH_EPISODE, searchEpisode);
}


function* episodeSaga():any {
    yield all([
        fork(watchLoadEpisode),
        fork(watchModalClick),
        fork(watchSaveEpisode),
        fork(watchUpdateEpisode),
        fork(watchDeleteEpisode),
        fork(watchSearchEpisode),
    ]);
}

export default episodeSaga;