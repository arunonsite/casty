// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse, fetchJSON, processPutSuccessResponse} from '../../helpers/applicationUtils';

import {
    LOAD_USERS,
    LOAD_USERS_FAILED,
    LOAD_USERS_SUCCESS,
    ONCLICK_MODAL,
    SAVE_USER_SUCCESS,SAVE_USER  ,SAVE_USER_FAILED,
    TOGGLE_USER_MODAL 
} from '../../constants/actionTypes';


import appSettings from '../../App.Settings';

import {
    loadUserSuccess,
    toggleUserModal ,
    saveUserSuccess,
    saveUserFailed  
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
    const {fname="",lname="",username="",password="",email="",phone="",role= "User",
    parentId= " ",companyID= ""} = payload;
    const newUserData= {
        "Email": email,
        "Password": password,
        "FirstName": fname,
        "LastName": lname,
        "Roles": [
            role
        ],
        "CompanyID": companyID
    }

     console
     .log("newUserData---", newUserData);
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



function* userSaga():any {
    yield all([
        fork(watchLoadUser),
        fork(watchModalClick),
        fork(watchSaveUser),
    ]);
}

export default userSaga;