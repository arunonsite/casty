// @flow
import {
    LOAD_COMPANY,
    LOAD_COMPANY_FAILED,
    LOAD_COMPANY_SUCCESS,
    ONCLICK_MODAL,
    TOGGLE_COMPANY_MODAL,
    SAVE_COMPANY_SUCCESS, SAVE_COMPANY_FAILED,SAVE_COMPANY,
    UPDATE_COMPANY_SUCCESS,UPDATE_COMPANY_FAILED,UPDATE_COMPANY,
    DELETE_COMPANY_SUCCESS, DELETE_COMPANY_FAILED, DELETE_COMPANY,
    RESET_COMPANY_NOTIFICATION, SEARCH_COMPANY,
    HANDLE_COMPANY_SEARCH_TEXT, UPDATE_COMPANY_SEARCH_TEXT,
    LOAD_COMPANY_COUNTRY_SUCCESS,LOAD_COMPANY_COUNTRY ,
    LOAD_COMPANY_STATE, LOAD_COMPANY_STATE_SUCCESS

    
} from '../../constants/actionTypes';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {   
    filterText : "", 
    companies:[],
    loading: false,
    newComapny : {   name: '',    description : '',    cphoto : '',address:'', contact1:'', contact2:'', details:'',},
    companies :[],
    companyModal :{show: false,title: 'New Comapny',mode : 'Add',data:   {name: '',description: '',cphoto : '', address:'', contact1:'', contact2:'', details:'',}},
    companyNotification : {notify:false, message:''}
};

type ComapnyAction = { type: string, payload: {} | string };
type State = { companies?: {} | null, loading?: boolean, +value?: boolean };

const Comapny = (state:State = INIT_STATE, action: AuthAction) => {
    switch (action.type) {

        case LOAD_COMPANY:
            return { ...state,companyNotification :INIT_STATE.companyNotification, loading: true};
        case LOAD_COMPANY_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOAD_COMPANY_SUCCESS:
             const {response=[]}  =action.payload;
            return { ...state, companies: response,companyNotification :INIT_STATE.companyNotification, loading: false, error: null };
        
        case ONCLICK_MODAL:
            return { ...state, loading: true};
        
        case TOGGLE_COMPANY_MODAL:
            return { ...state, ...action.payload, loading: false};
            case SAVE_COMPANY:
                return { ...state, loading: true};
        case SAVE_COMPANY_SUCCESS:
             console
             .log("PAYLOAD---", action);
            return { ...state, ...action.payload, loading: false, error: null };

            case UPDATE_COMPANY:
                return { ...state, loading: true};
        case UPDATE_COMPANY_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };
        
            case DELETE_COMPANY:
                return { ...state, loading: true };
            case DELETE_COMPANY_SUCCESS:
                return { ...state, ...action.payload, loading: false, error: null };
            case DELETE_COMPANY_FAILED:
                return { ...state, ...action.payload,loading: false };   
                case RESET_COMPANY_NOTIFICATION:
                    return { ...state, ...action.payload, loading: false };

                    case SEARCH_COMPANY:
                        return { ...state, loading: true };
                        case HANDLE_COMPANY_SEARCH_TEXT:
                            return { ...state, loading: true };

                            case UPDATE_COMPANY_SEARCH_TEXT:
                                return { ...state, filterText: action.payload.filterText, loading: false };

                                case LOAD_COMPANY_COUNTRY:
                                    return { ...state,companyNotification :INIT_STATE.companyNotification, loading: true};
                          
                                case LOAD_COMPANY_COUNTRY_SUCCESS:
                                        return { ...state, company_country: action.payload.response,companyNotification :INIT_STATE.companyNotification, loading: false, error: null };
                                
                                        case LOAD_COMPANY_STATE:
                                            return { ...state,companyNotification :INIT_STATE.companyNotification, loading: true};
                                  
                                        case LOAD_COMPANY_STATE_SUCCESS:
                                                return { ...state, company_state: action.payload.response,companyNotification :INIT_STATE.companyNotification, loading: false, error: null };
                                        
        default: return { ...state };
    }
}

export default Comapny;