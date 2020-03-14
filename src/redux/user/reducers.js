// @flow
import {
    LOAD_USERS,
    LOAD_USERS_FAILED,
    LOAD_USERS_SUCCESS,
    TOGGLE_USER_MODAL , ONCLICK_MODAL,
    SAVE_USER_SUCCESS,SAVE_USER  ,SAVE_USER_FAILED,
    LOAD_COMPANY_BY_USER_FOR_USER,LOAD_COMPANY_BY_USER_SUCCESS_FOR_USER,
    UPDATE_USER,UPDATE_USER_SUCCESS,
    RESET_USER_NOTIFICATION
} from '../../constants/actionTypes';



const INIT_STATE = {
    
    users:[],
    loading: false,
    userModal :{show: false,title: 'New User',mode : 'Add',
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

};

type UserAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const User = (state:State = INIT_STATE, action: UserAction) => {
    switch (action.type) {

        case LOAD_USERS:
            return { ...state, loading: true};
        case LOAD_USERS_SUCCESS:            
            const {response:{data=[]}}  =action.payload;
            return { ...state, users: data,userNotification :INIT_STATE.userNotification, loading: false, error: null };

        case LOAD_USERS_FAILED:
            return { ...state, error: action.payload, loading: false, error: null };
        
            case ONCLICK_MODAL:
                return { ...state, loading: true};      
            case TOGGLE_USER_MODAL:
                return { ...state, ...action.payload, loading: false};
                case SAVE_USER:
                    return { ...state, loading: true};
            case SAVE_USER_SUCCESS:
                return { ...state, ...INIT_STATE, ...action.payload, loading: false, error: null };
            case SAVE_USER_FAILED:
                return { ...state, ...action.payload, loading: false, error: null };


                case LOAD_COMPANY_BY_USER_FOR_USER:
                    return { ...state, loading: true };
                case LOAD_COMPANY_BY_USER_SUCCESS_FOR_USER:
                    return {
                        ...state, availableCompany: action.payload.response !== undefined ? action.payload.response : [],
                        userNotification: INIT_STATE.userNotification, loading: false, error: null
                    }
                    case UPDATE_USER:
            return { ...state, loading: true };
        case UPDATE_USER_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };

            case RESET_USER_NOTIFICATION:
                return { ...state, ...action.payload, loading: false };
        default: return { ...state };
    }
}

export default User;