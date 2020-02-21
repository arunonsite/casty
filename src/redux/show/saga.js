// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { processSuccessResponse} from '../../helpers/applicationUtils';

import {
    LOAD_SHOW_SUCCESS,    
    LOAD_SHOW_FAILED,
    LOAD_SHOW,
     ONCLICK_MODAL,
    TOGGLE_SHOW_MODAL,
    SAVE_SHOW
} from '../../constants/actionTypes';
import appSettings from '../../App.Settings';
import {
    loadShowSuccess,
    toggleShowModal,
    saveShowSuccess
} from './actions';

 const onShowSaveSuccess = {
    showModal :{show: false,title: 'New Show',mode : 'Add',data:   {name: '',description: '',cphoto : ''}},
    showNotification : {notify:false, message:''}
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
function* loadShowList({payload={}}) {  
     console.log("payload---", payload); 
    // let payload = 'de8720ce-93f2-4b8a-bec8-c5ab5c7a2989'; 
    const options = {
        body: JSON.stringify(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        //const response = yield call(fetchJSON, 'http://casty.azurewebsites.net/Identity/Account/Login', options);
        const response = yield call(fetchJSON, appSettings.API_ROUTE.MAIN_SITE+appSettings
            .API_PATH.SHOW_LIST+'/'+payload+'?CreatedByUserId='+payload, options);
             console.log("response----", response);

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
function* onclickModal({payload={}}) {  
    yield put(toggleShowModal((payload)));
}

/**
 * Load the CHannnel lsit
 * @param {*} payload - username and password 
 */
function* saveNewShow({payload={}}) {
    
      const {name='', description='', userId=''} = payload;
      const newShowData= {
        "Name": name,
        "Description": description,
        "createdById" : userId
      }
    const options = {
        body: JSON.stringify(newShowData),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        const response = yield call(fetchJSON, 
            appSettings.API_ROUTE.MAIN_SITE+appSettings.API_PATH.CHANNEL_SAVE,
             options);

             const {name=''} = response; 
        if(name !== '' || name !== null){
            let  nwShow = Object.assign (
                {...onShowSaveSuccess}, { showNotification : {notify:true, message:'Show Added Successfully'}}
            );
          
            yield put(saveShowSuccess(nwShow));
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

export function* watchLoadShow():any {
    yield takeEvery(LOAD_SHOW, loadShowList);
}

export function* watchModalClick():any {
    yield takeEvery(ONCLICK_MODAL, onclickModal);
}

export function* watchSaveShow():any {
    yield takeEvery(SAVE_SHOW, saveNewShow);
}




function* showSaga():any {
    yield all([
        fork(watchLoadShow),
        fork(watchModalClick),
        fork(watchSaveShow),
    ]);
}

export default showSaga;