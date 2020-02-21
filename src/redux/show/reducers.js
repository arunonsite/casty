// @flow
import {
    LOAD_SHOW,
    LOAD_SHOW_FAILED,
    LOAD_SHOW_SUCCESS,
    ONCLICK_MODAL,
    TOGGLE_SHOW_MODAL,
    SAVE_SHOW_SUCCESS, SAVE_SHOW_FAILED,SAVE_SHOW
} from '../../constants/actionTypes';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {    
    shows:[],
    loading: false,
    newshow : {   name: '',    description : '',    cphoto : ''},
    shows :[],
    showModal :{show: false,title: 'New show',mode : 'Add',data:   {name: '',description: '',cphoto : ''}},
    showNotification : {notify:false, message:''}
};

type showAction = { type: string, payload: {} | string };
type State = { shows?: {} | null, loading?: boolean, +value?: boolean };

const show = (state:State = INIT_STATE, action: AuthAction) => {
    switch (action.type) {

        case LOAD_SHOW:
            return { ...state, loading: true};
        case LOAD_SHOW_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOAD_SHOW_SUCCESS:
             const {response=[]}  =action.payload;
             
            return { ...state, shows: response,showNotification :INIT_STATE.showNotification, loading: false, error: null };
        
        case ONCLICK_MODAL:
            return { ...state, loading: true};
        
        case TOGGLE_SHOW_MODAL:
            return { ...state, ...action.payload, loading: false};
            case SAVE_SHOW:
                return { ...state, loading: true};
        case SAVE_SHOW_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };
      
        default: return { ...state };
    }
}

export default show;