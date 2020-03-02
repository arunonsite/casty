// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse} from '../../helpers/applicationUtils';

import {
    LOAD_SHOW,
     ONCLICK_MODAL,
    SAVE_SHOW,
    LOAD_CHANNELS_BY_USER,
     UPDATE_SHOW,
     RESET_SHOW_NOTIFICATION,
     DELETE_SHOW

} from '../../constants/actionTypes';
import appSettings from '../../App.Settings';
import {
    loadShowSuccess,
    toggleShowModal,
    saveShowSuccess,
    loadChannelsByUserSuccess,
    updateShowSuccess,
    updateShowFailed,
    resetShowNotification,
    deleteShowSuccess
} from './actions';

 const onShowSaveSuccess = {
    showModal :{show: false,title: 'New Show',mode : 'Add',data:   {name: '',description: '',cphoto : ''}},
    showNotification : {notify:false,mode:0,  message:''}
 }
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
            return {error : error};
         });
}


/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* loadShowList({payload={}}) {  
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
            .API_PATH.SHOW_LIST+'/'+payload+'?CreatedByUserId='+payload, options);
           

        yield put(loadShowSuccess(processSuccessResponse(response)));
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
function* loadChannelsByUser({payload={}}) {  
  
   // let payload = 'de8720ce-93f2-4b8a-bec8-c5ab5c7a2989'; 
   const options = {
       body: JSON.stringify(),
       method: 'GET',
       headers: { 'Content-Type': 'application/json' }
   };
   try {
       //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
       const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
           .API_PATH.LOAD_CHANNEL_BY_USER+'/'+payload+'?CreatedByUserId='+payload, options);
      

       yield put(loadChannelsByUserSuccess(processSuccessResponse(response)));
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
    yield put(toggleShowModal((payload)));
}

/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* saveNewShow({payload={}}) {

     console.log("payload---New Show---", payload);
    
      const {name='', description='', UserId='', channelId=''} = payload;


      const newShowData= {
          ...payload,
        "Name": name,
        "Description": description,
        "createdById" : UserId,
        "ChannelId" :channelId

      }
    const options = {
        body: JSON.stringify(newShowData),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    try {

        const response = yield call(fetchJSON, 
            appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.SHOW_SAVE+'?UserId='+UserId,
             options);
             const {name='', error={}} = response; 
             if(name !== '' || name !== null && error === null){                  
                 let  nwShow = Object.assign (
                     {...onShowSaveSuccess}, { showNotification : {notify:true,mode:0 ,  message:'Show Added Successfully'}}
                 );             
                 yield put(updateShowSuccess(nwShow));
              }else{        
                  const {error : {message =''}} = response;
                  let apiErrorMessage = 'Unable to add show';
                  if(message === ''){                             
                   apiErrorMessage = 'Unable to Update Successfully';                 
                  }
       
                  let  nwShow = Object.assign (
                   {...onShowSaveSuccess}, { showNotification : {notify:true,mode:-1 ,  message:apiErrorMessage}}
               );
                  yield put(updateShowFailed(nwShow));       
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
function* updateShow({payload={}}) {
    
    const {name='', description='', UserId='', channelId=''} = payload;
    const nuptShowData= {
        ...payload,
      "Name": name,
      "Description": description,
      "createdById" : UserId,
      "ChannelId" :channelId,
      

    }
  const options = {
      body: JSON.stringify(nuptShowData),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {

      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.SHOW_UPDATE+'?UserId='+UserId,
           options); 
           const {name='', error={}} = response; 
      if(name !== '' || name !== null && error === null){
           
          let  nwShow = Object.assign (
              {...onShowSaveSuccess}, { showNotification : {notify:true,mode:0 ,  message:'Show Added Successfully'}}
          );
      
          yield put(updateShowSuccess(nwShow));
       }else{        
           const {error : {message =''}} = response;
           let apiErrorMessage = 'Unable to Update show';
           if(message === ''){                             
            apiErrorMessage = 'Unable to Update Successfully';                 
           }

           let  nwShow = Object.assign (
            {...onShowSaveSuccess}, { showNotification : {notify:true,mode:-1 ,  message:apiErrorMessage}}
        );
           yield put(updateShowFailed(nwShow));         

       }
    //  yield put(saveShowSuccess(processSuccessResponse(response)));
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
function* deleteShow({payload={}}) {
     console
     .log("payload--", payload);
    
    const {name='', description='', UserID='', ShowId='', id=''} = payload;
    const nuptShowData= {
      "Name": name,
      "Description": description,
      "createdById" : UserID,
      "ShowID" :ShowId,
      "UserID" :UserID,
      "Id" :id

    }
  const options = {
      body: JSON.stringify(nuptShowData),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {

      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.SHOW_DELETE+'?ShowID='+ShowId+
          '&UserID='+UserID,
           options); 
           const {name='', error={}} = response; 
      if(name !== '' || name !== null && error === null){
           
          let  nwShow = Object.assign (
              {...onShowSaveSuccess}, { showNotification : {notify:true,mode:0 ,  message:'Show delete Successfully'}}
          );
      
          yield put(deleteShowSuccess(nwShow));
       }else{        
           const {error : {message =''}} = response;
           let apiErrorMessage = 'Unable to delete show';
           if(message === ''){                             
            apiErrorMessage = 'Unable to Updadeletete Successfully';                 
           }

           let  nwShow = Object.assign (
            {...onShowSaveSuccess}, { showNotification : {notify:true,mode:-1 ,  message:apiErrorMessage}}
        );
           yield put(updateShowFailed(nwShow));         

       }
    //  yield put(saveShowSuccess(processSuccessResponse(response)));
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
function* resetShowNotifications({payload={}}) {  
    try {
        yield put(resetShowNotification(payload));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
    }
}
export function* watchLoadShow():any {
    yield takeEvery(LOAD_SHOW, loadShowList);
}

export function* watchLoadChannelsOfUser():any {
    yield takeEvery(LOAD_CHANNELS_BY_USER, loadChannelsByUser);
}

export function* watchModalClick():any {
    yield takeEvery(ONCLICK_MODAL, onclickModal);
}

export function* watchSaveShow():any {
    yield takeEvery(SAVE_SHOW, saveNewShow);
}

export function* watchUpdateShow():any {
    yield takeEvery(UPDATE_SHOW, updateShow);
}
export function* watchResetNotificationShow():any {
    yield takeEvery(RESET_SHOW_NOTIFICATION, resetShowNotifications);
}
export function* watchDeleteShow():any {
    yield takeEvery(DELETE_SHOW, deleteShow);
}




function* showSaga():any {
    yield all([
        fork(watchLoadShow),
        fork(watchModalClick),
        fork(watchSaveShow),
        fork(watchUpdateShow),
        fork(watchLoadChannelsOfUser),
        fork(watchDeleteShow)
    ]);
}

export default showSaga;