// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse, processPutSuccessResponse} from '../../helpers/applicationUtils';

import {
    LOAD_CHANNEL,
     ONCLICK_MODAL,
    SAVE_CHANNEL,
    UPDATE_CHANNEL,
     DELETE_CHANNEL,
    LOAD_COMPANY_BY_USER_FOR_CHANNEL,RESET_CHANNEL_NOTIFICATION,
    LOAD_DEPARTMENT_BY_USER_FOR_CHANNEL,
    SEARCH_CHANNEL
} from '../../constants/actionTypes';
import appSettings from '../../App.Settings';
import {
    loadChannelSuccess,
    toggleChannelModal,
    saveChannelSuccess,
    updateChannelSuccess,
    deleteChannelSuccess,
    loadCompanyListForChannalSuccess,
    resetChannelNotification,
    loadDepartmentListSuccessForChannal,
    searchChannelSuccess
    
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
      const {currentUsrAccess, companyID} = payload;
    
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        let url = appSettings.API_ROUTE.MAIN_SITE; 
        if(currentUsrAccess === 0){
            url = url+'/api/Channels'   
           let sera =  ' ';
           let skp =  0;
           let take = 20;
           url += '/'+sera+'/SkipTake/' +skp;                        
           url += '/' + 20  
          }else{
            url =  url+'/api/Channels/ByCompany/'+companyID 
            let sera = ' ';
            let skp =  0;
            let take = 20;
            url += '/'+sera+'/' +skp;                        
            url += '/' + 20   
          }
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, url, options);
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
    
      const {departmentId, name='', description='', UserId='', ImageBase64, ImageFileExtensionIncludingDot,
      companyId,Id} = payload;
      const newChannelData= {
       
        "Name": name,
        "Description": description,
        "createdById" : UserId,

        
      
    
        
        ImageBase64, ImageFileExtensionIncludingDot,
        CompanyId : companyId,Id, DepartmentId :departmentId
      }
    const options = {
        body: JSON.stringify(newChannelData),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        const response = yield call(fetchJSON, 
            appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.CHANNEL_SAVE+'?UserId='+UserId,
             options);
            
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
 * Updating the selected Channel
 * @param {*} payload - username and password 
 */
function* updateChannel({payload={}}) {
    
    const {name='', description='', id='',UserId=''} = payload;
    const updateChannelData= {
        ...payload ,
      "Name": name,
      "Description": description,
      "Id" : id
    }
  const options = {
      body: JSON.stringify(updateChannelData),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {
      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.CHANNEL_UPDATE+"?UserId="+UserId,
           options);
           const status  = processPutSuccessResponse(response, 'name');
           const {name=''} = response; 
      if(name !== '' || name !== null){
          let  nwChannel = Object.assign (
              {...onChannelSaveSuccess}, { channelNotification : {notify:true, message:'Channel Updated Successfully'}}
          );          
          yield put(updateChannelSuccess(nwChannel));
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
 * Updating the selected Channel
 * @param {*} payload - username and password 
 */
function* deleteChannel({payload={}}) {
    
   
  const options = {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {
      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.CHANNEL_DELETE
          +'?ChannelID='+payload.ChannelID+"&UserID="+payload.ChannelID,
           options);



           const {name='', error={}} = response; 
           if(name !== '' || name !== null && error === null){
                
               let  nwShow = Object.assign (
                   {...onChannelSaveSuccess}, { channelNotification : {notify:true,mode:0 ,  message:'Channel delete Successfully'}}
               );
           
               yield put(deleteChannelSuccess(nwShow));
            }else{        
                const {error : {message =''}} = response;
                let apiErrorMessage = 'Unable to delete show';
                if(message === ''){                             
                 apiErrorMessage = 'Unable to Updadeletete Successfully';                 
                }
     
                let  nwShow = Object.assign (
                 {...onChannelSaveSuccess}, { channelNotification : {notify:true,mode:-1 ,  message:apiErrorMessage}}
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
function* loadCompanyForChannel({payload={}}) { 

     const {currentUsrAccess, companyID=''} =  payload;
  
    // let payload = 'de8720ce-93f2-4b8a-bec8-c5ab5c7a2989'; 
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        let response = {};
         console
         .log("currentUsrAccess", currentUsrAccess);
        
        if(currentUsrAccess <= 0){// Super Admin
            ///api/Companies/Names
            response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
                .API_PATH.SHOW_SUPER_LOAD_COMPANIES , options);
                 
        }else{ // Admin
            response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
                .API_PATH.SHOW_LOAD_COMPANIES+'/'+companyID, options);  
        }
        if(response.data !== undefined){
            yield put(loadCompanyListForChannalSuccess(processSuccessResponse(response.data)));
        }else{
            yield put(loadCompanyListForChannalSuccess(processSuccessResponse(response)));
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
function* resetChannelNotifications({payload={}}) {  
    try {
        yield put(resetChannelNotification(payload));
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
function* loadDepartmentForChannel({payload={}}) { 

    const {currentUsrAccess, companyID=''} =  payload;

 
   // let payload = 'de8720ce-93f2-4b8a-bec8-c5ab5c7a2989'; 
   const options = {
       body: JSON.stringify(),
       method: 'GET',
       headers: { 'Content-Type': 'application/json' }
   };
   try {
       //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
       let response = {};
     
       response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
        .API_PATH.DEPARTMENT_LIST+'/'+companyID, options);  

       if(response.data !== undefined){
           yield put(loadDepartmentListSuccessForChannal(processSuccessResponse(response.data)));
       }else{
           yield put(loadDepartmentListSuccessForChannal(processSuccessResponse(response)));
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
function* searchChannel({payload={}}) {

     const { userId='',currentUsrAccess=0,companyID= "", filterText=" "} = payload;
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {

        let url = appSettings.API_ROUTE.MAIN_SITE; 
        if(currentUsrAccess === 0){
            url = url+'/api/Channels'   
           let sera = filterText;
           let skp =  0;
           let take = 100;
           url += '/'+sera+'/SkipTake/' +skp;                        
           url += '/' + 100  
          }else{
            url =  url+'/api/Channels/ByCompany/'+companyID 
            let sera = filterText;
            let skp =  0;
            let take = 100;
            url += '/'+sera+'/' +skp;                        
            url += '/' + 100   
          }
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, url, options);

        
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
    yield takeEvery(LOAD_CHANNEL, loadChannelList);
}

export function* watchModalClick():any {
    yield takeEvery(ONCLICK_MODAL, onclickModal);
}

export function* watchSaveChannel():any {
    yield takeEvery(SAVE_CHANNEL, saveNewChannel);
}

export function* watchUpdateChannel():any {
    yield takeEvery(UPDATE_CHANNEL, updateChannel);
}

export function* watchDeleteChannel():any {
    yield takeEvery(DELETE_CHANNEL, deleteChannel);
}
export function* watchLoadComapnyForChannel():any {
    yield takeEvery(LOAD_COMPANY_BY_USER_FOR_CHANNEL, loadCompanyForChannel);
}
export function* watchResetNotificationShow():any {
    yield takeEvery(RESET_CHANNEL_NOTIFICATION, resetChannelNotifications);
}
export function* watchLoadDepartmentForChannel():any {
    yield takeEvery(LOAD_DEPARTMENT_BY_USER_FOR_CHANNEL, loadDepartmentForChannel);
}
export function* watchSearchChannel():any {
    yield takeEvery(SEARCH_CHANNEL, searchChannel);
}
function* channelSaga():any {
    yield all([
        fork(watchLoadChannel),
        fork(watchModalClick),
        fork(watchSaveChannel),
        fork(watchUpdateChannel),
        fork(watchDeleteChannel),
        fork(watchLoadComapnyForChannel),
        fork(watchLoadDepartmentForChannel),
        fork(watchSearchChannel),
    ]);
}

export default channelSaga;