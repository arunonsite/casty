// @flow
import {
    LOAD_SHOW,
    LOAD_SHOW_FAILED,
    LOAD_SHOW_SUCCESS,
    ONCLICK_MODAL,
    TOGGLE_SHOW_MODAL,
    SAVE_SHOW_SUCCESS, SAVE_SHOW_FAILED, SAVE_SHOW,
     LOAD_CHANNELS_BY_USER_SUCCESS, LOAD_CHANNELS_BY_USER_FAILED,
    UPDATE_SHOW_SUCCESS, UPDATE_SHOW_FAILED, UPDATE_SHOW,RESET_SHOW_NOTIFICATION,
    DELETE_SHOW_FAILED, DELETE_SHOW_SUCCESS, DELETE_SHOW,
    LOAD_COMPANY_BY_USER_FOR_SHOWS, LOAD_COMPANY_BY_USER_SUCCESS_FOR_SHOWS, LOAD_COMPANY_BY_USER_FAILED_FOR_SHOWS,
    LOAD_CHANNELS_FOR_SHOWS_SUCCESS, LOAD_CHANNELS_FOR_SHOWS

} from '../../constants/actionTypes';



const INIT_STATE = {
    shows: [],
    loading: false,
    channelsByUser: [],
    showModal: {
        show: false, title: 'New show2', mode: 'Add', fromData: {
            name: '', description: '',
            cphoto: '', channelId: '',
            channelName: '',
        }
    },
    showNotification: { notify: false,mode:0,  message: '' }
};



const show = (state = INIT_STATE, action = {  }) => {
    switch (action.type) {

        case LOAD_SHOW:
            return { ...state, loading: true };
        case LOAD_SHOW_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOAD_SHOW_SUCCESS:
            const { response : {data=[]}, response={} } = action.payload;
            return {
                ...state, shows: data, data:response,   
                showNotification: INIT_STATE.showNotification, loading: false, error: null
            };
        case ONCLICK_MODAL:
            return { ...state, loading: true };
        case TOGGLE_SHOW_MODAL:
            return { ...state, ...action.payload, loading: false };
        case SAVE_SHOW:
            return { ...state, loading: true };
        case SAVE_SHOW_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };

        case UPDATE_SHOW:
            return { ...state, loading: true };
        case UPDATE_SHOW_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };
        case UPDATE_SHOW_FAILED:
            return { ...state, ...action.payload,loading: false };
        case RESET_SHOW_NOTIFICATION:
            return { ...state, ...action.payload, loading: false };

            case DELETE_SHOW:
                return { ...state, loading: true };
            case DELETE_SHOW_SUCCESS:
                return { ...state, ...action.payload, loading: false, error: null };
            case DELETE_SHOW_FAILED:
                return { ...state, ...action.payload,loading: false };

                case LOAD_COMPANY_BY_USER_FOR_SHOWS:
                    return { ...state, loading: true };
                    case LOAD_COMPANY_BY_USER_SUCCESS_FOR_SHOWS:
                        return {
                            ...state, availableCompany: action.payload.response !== undefined ? action.payload.response : [],
                            showNotification: INIT_STATE.showNotification, loading: false, error: null
                        }
                        case LOAD_CHANNELS_FOR_SHOWS:
                            return { ...state, loading: true };
                        case LOAD_CHANNELS_FOR_SHOWS_SUCCESS: 
                            return {
                                ...state, availableChannel: action.payload.response !== undefined ? action.payload.response : [],
                                showNotification: INIT_STATE.showNotification, loading: false, error: null
                            };

        default: return { ...state };
    }
}

export default show;