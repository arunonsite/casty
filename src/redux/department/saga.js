// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse, fetchJSON, processPutSuccessResponse} from '../../helpers/applicationUtils';

import {
    TOGGLE_DEPARTMENT_MODAL , ONCLICK_DEPARTMENT_MODAL,LOAD_DEPARTMENT,
    SAVE_DEPARTMENT_SUCCESS,SAVE_DEPARTMENT  ,SAVE_DEPARTMENT_FAILED,
    LOAD_COMPANY_BY_DEPARTMENT_FOR_DEPARTMENT,LOAD_COMPANY_BY_DEPARTMENT_SUCCESS_FOR_DEPARTMENT,
    UPDATE_DEPARTMENT,UPDATE_DEPARTMENT_SUCCESS,
    RESET_DEPARTMENT_NOTIFICATION, DELETE_DEPARTMENT
} from '../../constants/actionTypes';


import appSettings from '../../App.Settings';

import {
    loadDepartemntSuccess,
    deleteDepartmentSuccess,
    toggleDepartmentModal ,
    saveDepartmentSuccess,
    saveDepartmentFailed ,
    loadCompanyListSuccessForDepartment,
    resetDepartmentNotification
} from './actions';


const onDepartmentSaveSuccess = {
    departmentModal :{
        show: false,title: 'New Department',mode : 'Add',
    data:   {
        name:  '',
        description: '', companyID :''
    }},
    departmentNotification : {notify:false, message:''}
 }


/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* saveNewDepartment({payload={}}) { 
    const {name = "",
    description = "",
    companyID = "",
   
    Id = ""} = payload;
    const newUserData= {
        "Id": Id,
  "Name": name,
  "CompanyId": companyID,
  "Description": description
       
    }

  const options = {
      body: JSON.stringify(newUserData),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {
      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.DEPARTMENT_SAVE,
           options);
            const {status = false, message=''} = processPutSuccessResponse(response, 'id');
             console
             .log("status", '----', status);
      if(status){
          let  newUser = Object.assign (
              {...onDepartmentSaveSuccess},
              { departmentNotification : {notify:true,status:0,  message:'Department Added Successfully'}}
          );        
          yield put(saveDepartmentSuccess(newUser)); 
       }else{
          
        let  newUser = Object.assign (           
            { departmentNotification : {notify:true, status:1, message}}
        );        
        yield put(saveDepartmentFailed(newUser));
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
function* loadCompanyListForDepartment({payload={}}) { 

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
           yield put(loadCompanyListSuccessForDepartment(processSuccessResponse(response.data)));
       }else{
           yield put(loadCompanyListSuccessForDepartment(processSuccessResponse(response)));
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
function* updateDepartment({payload={}}) {
     console.log("payload---", payload);
    const {name = "",
    description = "",
    companyID = "",
    departmentId='',
    UserId
   
     } = payload;
    const newUserData= {
        "Id": departmentId,
  "Name": name,
  "CompanyId": companyID,
  "Description": description
       
    }
    
    /* 
    const {firstName ='',
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
        BlockedBy :BlockedBy
    } */
  const options = {
      body: JSON.stringify(newUserData),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {

    const response = yield call(fetchJSON, 
        appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.DEPARTMENT_UPDATE+'/'+UserId,
         options);


           const {status = false, message=''} = processPutSuccessResponse(response, 'id');
            console
            .log("response---", response);
           if(status){
               let  newUser = Object.assign (
                   {...onDepartmentSaveSuccess},
                   { departmentNotification : {notify:true,status:0,  message:'User Added Successfully'}}
               );        
               yield put(saveDepartmentSuccess(newUser)); 
            }else{
               
             let  newUser = Object.assign (           
                 { departmentNotification : {notify:true, status:1, message}}
             );        
             yield put(saveDepartmentFailed(newUser));
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
function* resetDepartmentNotifications({payload={}}) {  
    try {
        yield put(resetDepartmentNotification(payload));
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
function* loadDepartmentList({payload={}}) {

    console.log("payload---", payload);
     const {currentUsrAccess, companyID} = payload;
   
   const options = {
       body: JSON.stringify(),
       method: 'GET',
       headers: { 'Content-Type': 'application/json' }
   };
   try {
       let url = appSettings.API_ROUTE.MAIN_SITE; 
       if(currentUsrAccess === 0){
           url = url+'/api/Departments/ByCompany/'  
          let sera =  ' ';
          let skp =  0;
          let take = 100;
          url += '/'+sera+'/SkipTake/' +skp;                        
          url += '/' + take  
         }else{
            url = url+'/api/Departments/'+companyID   
           let sera = ' ';
           let skp =  0;
           let take = 20;
           url += '/'+sera+'/SkipTake/' +skp;                        
           url += '/' + 20   
         }
          console.log("url---", url);
       //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
       const response = yield call(fetchJSON, url, options);
       yield put(loadDepartemntSuccess(processSuccessResponse(response)));
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
function* deleteDepartment({payload={}}) {
    
   
    const options = {
        body: JSON.stringify(payload),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        const response = yield call(fetchJSON, 
            appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.DEPARTMENT_DELETE
            +'/'+payload.DepartmentId+"/"+payload.UserID,
             options);
  
  
  
             const {name='', error={}} = response; 
             if(name !== '' || name !== null && error === null){
                  
                 let  nwShow = Object.assign (
                     {...onDepartmentSaveSuccess}, { departmentNotification : {notify:true,mode:0 ,  message:'Department delete Successfully'}}
                 );
             
                 yield put(deleteDepartmentSuccess(nwShow));
              }else{        
                  const {error : {message =''}} = response;
                  let apiErrorMessage = 'Unable to delete show';
                  if(message === ''){                             
                   apiErrorMessage = 'Unable to delete Successfully';                 
                  }
       
                  let  nwShow = Object.assign (
                   {...onDepartmentSaveSuccess}, { departmentNotification : {notify:true,mode:-1 ,  message:apiErrorMessage}}
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
function* onclickModal({payload={}}) {  
    yield put(toggleDepartmentModal((payload)));
}

export function* watchModalClick():any {
    yield takeEvery(ONCLICK_DEPARTMENT_MODAL, onclickModal);
}
export function* watchSaveUser():any {
    yield takeEvery(SAVE_DEPARTMENT, saveNewDepartment);
}

export function* watchLoadComapnyForDepartment():any {
    yield takeEvery(LOAD_COMPANY_BY_DEPARTMENT_FOR_DEPARTMENT, loadCompanyListForDepartment);
}

export function* watchUpdateUser():any {
    yield takeEvery(UPDATE_DEPARTMENT, updateDepartment);
}
export function* watchResetNotificationShow():any {
    yield takeEvery(RESET_DEPARTMENT_NOTIFICATION, resetDepartmentNotifications);
}
export function* watchLoadDepartment():any {
    yield takeEvery(LOAD_DEPARTMENT, loadDepartmentList);
}

export function* watchDeleteChannel():any {
    yield takeEvery(DELETE_DEPARTMENT, deleteDepartment);
}

function* departmentSaga():any {
    yield all([
        fork(watchLoadDepartment),
        fork(watchLoadComapnyForDepartment),
  
        fork(watchModalClick),
        fork(watchSaveUser),
        fork(watchUpdateUser),
        fork(watchDeleteChannel),
    ]);
}

export default departmentSaga;