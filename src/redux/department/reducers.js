// @flow
import {
    LOAD_DEPARTMENT, LOAD_DEPARTMENT_SUCCESS, LOAD_DEPARTMENT_FAILED,
    TOGGLE_DEPARTMENT_MODAL , ONCLICK_DEPARTMENT_MODAL,
    SAVE_DEPARTMENT_SUCCESS,SAVE_DEPARTMENT  ,SAVE_DEPARTMENT_FAILED,
    LOAD_COMPANY_BY_DEPARTMENT_FOR_DEPARTMENT,LOAD_COMPANY_BY_DEPARTMENT_SUCCESS_FOR_DEPARTMENT,
    UPDATE_DEPARTMENT,UPDATE_DEPARTMENT_SUCCESS,
    RESET_DEPARTMENT_NOTIFICATION,
    DELETE_DEPARTMENT, DELETE_DEPARTMENT_SUCCESS,
    SEARCH_DEPARTMENT, SEARCH_DEPARTMENT_SUCCESS
} from '../../constants/actionTypes';






const INIT_STATE = {
    
    departments:[],
    loading: false,
    departmentModal :{show: false,title: 'New Deprt',mode : 'Add',
    data:   {
        name:  '',
        description: '', companyID :''
    }},
    departmentNotification : {notify:false, message:''}

};

type UserAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Department = (state:State = INIT_STATE, action: UserAction) => {
    switch (action.type) {


        
        case LOAD_DEPARTMENT:
            return { ...state,departmentNotification :INIT_STATE.departmentNotification, loading: true};
        case LOAD_DEPARTMENT_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOAD_DEPARTMENT_SUCCESS:
             const {response=[]}  =action.payload; 
            return { ...state, departments: response,departmentNotification :INIT_STATE.departmentNotification, loading: false, error: null };
        

        
            case ONCLICK_DEPARTMENT_MODAL:
                return { ...state, loading: true};      
            case TOGGLE_DEPARTMENT_MODAL:
                return { ...state, ...action.payload, loading: false};
                case SAVE_DEPARTMENT:
                    return { ...state, loading: true};
            case SAVE_DEPARTMENT_SUCCESS:
                return { ...state, ...INIT_STATE, ...action.payload, loading: false, error: null };
            case SAVE_DEPARTMENT_FAILED:
                return { ...state, ...action.payload, loading: false, error: null };


                case LOAD_COMPANY_BY_DEPARTMENT_FOR_DEPARTMENT:
                    return { ...state, loading: true };
                case LOAD_COMPANY_BY_DEPARTMENT_SUCCESS_FOR_DEPARTMENT:
                    return {
                        ...state, availableCompany: action.payload.response !== undefined ? action.payload.response : [],
                        departmentNotification: INIT_STATE.departmentNotification, loading: false, error: null
                    }
                    case UPDATE_DEPARTMENT:
            return { ...state, loading: true };
        case UPDATE_DEPARTMENT_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };

            case RESET_DEPARTMENT_NOTIFICATION:
                return { ...state, ...action.payload, loading: false };

                
        case DELETE_DEPARTMENT:
            return { ...state, loading: true };
        case DELETE_DEPARTMENT_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };
            case SEARCH_DEPARTMENT:
                return { ...state, loading: true };

                case SEARCH_DEPARTMENT_SUCCESS:
                     console.log("---", action.payload);
                    const {response:{data = []}}  =action.payload; 
                   return { ...state, departments: data,departmentNotification :INIT_STATE.departmentNotification, loading: false, error: null };
               
       
               
        default: return { ...state };
    }
}

export default Department;