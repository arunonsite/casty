// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse, fetchJSON, processPutSuccessResponse} from '../../helpers/applicationUtils';

import {
    LOAD_USERS,
    ONCLICK_MODAL,SAVE_USER  ,
    LOAD_COMPANY_BY_USER_FOR_USER,UPDATE_USER,
    RESET_USER_NOTIFICATION,
    LOAD_DEPARTMENT_BY_USER_FOR_USER, HANDLE_USER_SEARCH_TEXT
} from '../../constants/actionTypes';


import appSettings from '../../App.Settings';

import {
    loadUserSuccess,
    toggleUserModal ,
    saveUserSuccess,
    saveUserFailed ,
    loadCompanyListSuccessForUser,
    loadDepartmentListSuccessForUser,
    resetUserNotification,
    updateSearchText
} from './actions';


const onUserSaveSuccess = {
    userModal :{
        show: false,title: 'New User',mode : 'Add',
    data:   {fname: "",
    lname: "",
    username: "",
    password: "",
    cpassword: "",
    email: "",
    cemail: "",
    phone: "",
    }},
    userNotification : {notify:false, message:''}
 }

/**
 * Load the user list
 * @param {*} payload - username and password 
 */
function* loadUserListByCompany({payload={}}) {
     const {CompanyID, currentUsrAccess} = payload;
     
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        let response={};

        if(currentUsrAccess <= 0){
             response = yield call(fetchJSON,
                appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.SUPER_USER_LIST+'/0/100',
                 options);
        }else{
             response = yield call(fetchJSON,
                appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.GET_USER_LIST_BYCOMPANY_ROUTE+'/'+CompanyID,
                 options);
        }
        
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


/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* saveNewUser({payload={}}) { 
    
     console
     .log("payload====", payload);
    const {firstName ='',roles,
    lastName='',password='',email='',cemail='',phone='',role='',companyID='',UserId='',Id, departmentId=''} = payload;
    const newUserData= {
        "Email": email,
        "Password": password,
        "FirstName": firstName,
        "LastName": lastName,
        "Roles": roles,
        "CompanyID": companyID,        
        Id,
        DepartmentID :departmentId       
    }


  const options = {
      body: JSON.stringify(newUserData),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {
      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.USER_SAVE,
           options);
            const {status = false, message=''} = processPutSuccessResponse(response, 'id');
      if(status){
          let  newUser = Object.assign (
              {...onUserSaveSuccess},
              { userNotification : {notify:true,status:0,  message:'User Added Successfully'}}
          );        
          yield put(saveUserSuccess(newUser)); 
       }else{
          
        let  newUser = Object.assign (           
            { userNotification : {notify:true, status:1, message}}
        );        
        yield put(saveUserFailed(newUser));
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

/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* loadCompanyForUser({payload={}}) { 

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
        .log("currentUsrAccess SAGA---", currentUsrAccess);
       if(currentUsrAccess <= 0){// Super Admin
           ///api/Companies/Names
         
               response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
                .API_PATH.SHOW_SUPER_LOAD_COMPANIES, options);       
       }else{ // Admin
        response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
            .API_PATH.SHOW_LOAD_COMPANIES+'/'+companyID, options);  
       }
       if(response.data !== undefined){
           yield put(loadCompanyListSuccessForUser(processSuccessResponse(response.data)));
       }else{
           yield put(loadCompanyListSuccessForUser(processSuccessResponse(response)));
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
function* loadDepartmentForUser({payload={}}) { 

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
           yield put(loadDepartmentListSuccessForUser(processSuccessResponse(response.data)));
       }else{
           yield put(loadDepartmentListSuccessForUser(processSuccessResponse(response)));
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
function* updateUser({payload={}}) {
    
    
    const {departmentId='', firstName ='',
    lastName='',password='',email='',cemail='',phone='',role='',companyID='',UserId='',roles, ID,blocked, BlockedBy} = payload;
    const newUserData= {
        "Email": email,
        "Password": password,
        "FirstName": firstName,
        "LastName": lastName,
        "Roles": roles,
        "CompanyID": companyID,        
        ID,
        Blocked :blocked,
        BlockedBy :BlockedBy,
     
        DepartmentID  :departmentId
    }
  const options = {
      body: JSON.stringify(newUserData),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {
      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.USER_UPDATE+"?UserId="+UserId,
          options );

           const {status = false, message=''} = processPutSuccessResponse(response, 'id');

           if(status){
               let  newUser = Object.assign (
                   {...onUserSaveSuccess},
                   { userNotification : {notify:true,status:0,  message:'User Added Successfully'}}
               );        
               yield put(saveUserSuccess(newUser)); 
            }else{
               
             let  newUser = Object.assign (           
                 { userNotification : {notify:true, status:1, message}}
             );        
             yield put(saveUserFailed(newUser));
               // yield put(loginUserFailed(message));
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
function* resetUserNotifications({payload={}}) {  
    try {
        yield put(resetUserNotification(payload));
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
function* userSearchTextUpdate({payload={}}) {  
    try {
        yield put(updateSearchText(payload));
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
    yield put(toggleUserModal((payload)));
}
export function* watchLoadUser():any {
    yield takeEvery(LOAD_USERS, loadUserListByCompany);
}
export function* watchModalClick():any {
    yield takeEvery(ONCLICK_MODAL, onclickModal);
}
export function* watchSaveUser():any {
    yield takeEvery(SAVE_USER, saveNewUser);
}

export function* watchLoadComapnyForUser():any {
    yield takeEvery(LOAD_COMPANY_BY_USER_FOR_USER, loadCompanyForUser);
}

export function* watchLoadComapnyForDepartment():any {

    yield takeEvery(LOAD_DEPARTMENT_BY_USER_FOR_USER, loadDepartmentForUser);
}

/* export function* watchResetNotificationShow():any {
    yield takeEvery(LOAD_COMPANY_BY_USER_SUCCESS_FOR_USER, resetUserNotifications);
} */
export function* watchUpdateUser():any {
    yield takeEvery(UPDATE_USER, updateUser);
}
export function* watchResetNotificationShow():any {
    yield takeEvery(RESET_USER_NOTIFICATION, resetUserNotifications);
}

export function* watchUserSearchTextUpdate():any {
    yield takeEvery(HANDLE_USER_SEARCH_TEXT, userSearchTextUpdate);
}

function* userSaga():any {
    yield all([
        fork(watchLoadComapnyForUser),
        fork(watchLoadComapnyForDepartment),
        fork(watchLoadUser),
        fork(watchModalClick),
        fork(watchSaveUser),
        fork(watchUpdateUser),
        fork(watchUserSearchTextUpdate),
    ]);
}

export default userSaga;