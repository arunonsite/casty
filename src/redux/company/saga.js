// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse, processPutSuccessResponse} from '../../helpers/applicationUtils';

import {
    LOAD_COMPANY,
     ONCLICK_MODAL,
    SAVE_COMPANY,
    UPDATE_COMPANY,
    DELETE_COMPANY,
    HANDLE_COMPANY_SEARCH_TEXT,
    LOAD_COMPANY_COUNTRY_SUCCESS,LOAD_COMPANY_COUNTRY ,
    LOAD_COMPANY_STATE, LOAD_COMPANY_STATE_SUCCESS

} from '../../constants/actionTypes';
import appSettings from '../../App.Settings';
import {
    loadCompanySuccess,
    toggleCompanyModal,
    saveCompanySuccess,
    updateCompanySuccess,
    deleteCompanySuccess,
    updateSearchText,
    loadCountryListSuccess,
    loadStateListForCompanySuccess
} from './actions';

 const onCompanySaveSuccess = {
    companyModal :{show: false,title: 'New Company',mode : 'Add',data:   {name: '',description: '',cphoto : ''}},
    companyNotification : {notify:false, message:''}
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
function* loadCompanyList({payload={}}) {
    
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
            .API_PATH.COMPANY_LIST, options);
        yield put(loadCompanySuccess(processSuccessResponse(response)));
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
    yield put(toggleCompanyModal((payload)));
}

/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* saveNewCompany({payload={}}) {
    
      const {companyName='',address='', contact1='', contact2='',  UserId='',
      details='',
      countryId='',
      stateId='',
      zipCode='',
      city='', Id,
    } = payload;


      const newCompanyData= {
        Id ,
        "Name": companyName,       
         
        "Details": details,
        "City": city,
        "StateId": stateId,
        "CountryId":countryId,
        "ZipCode": zipCode,
        "TimeZone": 0
      }
    const options = {
        body: JSON.stringify(newCompanyData),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        const response = yield call(fetchJSON, 
            appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.COMPANY_SAVE+'?UserId='+UserId,
             options);
          //   const status  = processPutSuccessResponse(response, 'name');
             const {companyName=''} = response; 
        if(companyName !== '' || companyName !== null){
            let  nwCompany = Object.assign (
                {...onCompanySaveSuccess}, { companyNotification : {notify:true, message:'Company Added Successfully'}}
            );      
            yield put(saveCompanySuccess(nwCompany));
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
 * Updating the selected Company
 * @param {*} payload - username and password 
 */
function* updateCompany({payload={}}) {
    const {id, companyName='',address='', contact1='', contact2='', details='', UserId='', } = payload;
    const updateCompanyData= {
      ...payload ,
      "Name": companyName,     
      "createdById" : UserId,
      "Address": address,
      "Contact1": contact1,
      "Contact2": contact2,
      "Details": details,    
      "Id" : id
    }
  const options = {
      body: JSON.stringify(updateCompanyData),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {
      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.COMPANY_UPDATE+"?UserId="+UserId,
           options);
           const status  = processPutSuccessResponse(response, 'companyName');
           const {companyName=''} = response; 
      if(companyName !== '' || companyName !== null){
          let  nwCompany = Object.assign (
              {...onCompanySaveSuccess}, { companyNotification : {notify:true, message:'Company Updated Successfully'}}
          );          
          yield put(updateCompanySuccess(nwCompany));
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
 * Updating the selected Company
 * @param {*} payload - username and password 
 */
function* deleteCompany({payload={}}) {
    
   
  const options = {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  };
  try {
      const response = yield call(fetchJSON, 
          appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.COMPANY_DELETE
          +'?CompanyID='+payload.CompanyID+"&UserID="+payload.UserID,
           options);



           const {name='', error={}} = response; 
           if(name !== '' || name !== null && error === null){
                
               let  nwShow = Object.assign (
                   {...onCompanySaveSuccess}, { companyNotification : {notify:true,mode:0 ,  message:'Company delete Successfully'}}
               );
           
               yield put(deleteCompanySuccess(nwShow));
            }else{        
                const {error : {message =''}} = response;
                let apiErrorMessage = 'Unable to delete show';
                if(message === ''){                             
                 apiErrorMessage = 'Unable to Updadeletete Successfully';                 
                }
     
                let  nwShow = Object.assign (
                 {...onCompanySaveSuccess}, { companyNotification : {notify:true,mode:-1 ,  message:apiErrorMessage}}
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
function* companySearchTextUpdate({payload={}}) {  
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
function* loadCompanyCountryList({payload={}}) {
    
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
            .API_PATH.GET_COUNTRY_LIST, options);
        yield put(loadCountryListSuccess(processSuccessResponse(response)));
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
function* loadCompanyStateList({payload={}}) {

    
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
            .API_PATH.GET_STATE_LIST+'/'+payload.companyID, options);
        yield put(loadStateListForCompanySuccess(processSuccessResponse(response)));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
    }
}
export function* watchLoadCompany():any {
    yield takeEvery(LOAD_COMPANY, loadCompanyList);
}

export function* watchModalClick():any {
    yield takeEvery(ONCLICK_MODAL, onclickModal);
}

export function* watchSaveCompany():any {
    yield takeEvery(SAVE_COMPANY, saveNewCompany);
}

export function* watchUpdateCompany():any {
    yield takeEvery(UPDATE_COMPANY, updateCompany);
}

export function* watchDeleteCompany():any {
    yield takeEvery(DELETE_COMPANY, deleteCompany);
}

export function* watchCompanySearchTextUpdate():any {
    yield takeEvery(HANDLE_COMPANY_SEARCH_TEXT, companySearchTextUpdate);
}

export function* watchLoadCountryList():any {
    yield takeEvery(LOAD_COMPANY_COUNTRY, loadCompanyCountryList);
}
export function* watchLoadStateList():any {
    yield takeEvery(LOAD_COMPANY_STATE, loadCompanyStateList);
}
function* companySaga():any {
    yield all([
        fork(watchLoadCompany),
        fork(watchModalClick),
        fork(watchSaveCompany),
        fork(watchUpdateCompany),
        fork(watchDeleteCompany),
        fork(watchCompanySearchTextUpdate),
        fork(watchLoadCountryList),
        fork(watchLoadStateList),
    ]);
}

export default companySaga;