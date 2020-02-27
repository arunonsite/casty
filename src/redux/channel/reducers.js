// @flow
import {
    LOAD_CHANNEL,
    LOAD_CHANNEL_FAILED,
    LOAD_CHANNEL_SUCCESS,
    ONCLICK_MODAL,
    TOGGLE_CHANNEL_MODAL,
    SAVE_CHANNEL_SUCCESS, SAVE_CHANNEL_FAILED,SAVE_CHANNEL,
    UPDATE_CHANNEL_SUCCESS,UPDATE_CHANNEL_FAILED,UPDATE_CHANNEL,
    DELETE_CHANNEL_SUCCESS, DELETE_CHANNEL_FAILED, DELETE_CHANNEL
} from '../../constants/actionTypes';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {    
    channels:[],
    loading: false,
    newChannel : {   name: '',    description : '',    cphoto : ''},
    channels :[],
    channelModal :{show: false,title: 'New Channel',mode : 'Add',data:   {name: '',description: '',cphoto : ''}},
    channelNotification : {notify:false, message:''}
};

type ChannelAction = { type: string, payload: {} | string };
type State = { channels?: {} | null, loading?: boolean, +value?: boolean };

const Channel = (state:State = INIT_STATE, action: AuthAction) => {
    switch (action.type) {

        case LOAD_CHANNEL:
            return { ...state, loading: true};
        case LOAD_CHANNEL_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOAD_CHANNEL_SUCCESS:
             const {response=[]}  =action.payload;
            return { ...state, channels: response,channelNotification :INIT_STATE.channelNotification, loading: false, error: null };
        
        case ONCLICK_MODAL:
            return { ...state, loading: true};
        
        case TOGGLE_CHANNEL_MODAL:
            return { ...state, ...action.payload, loading: false};
            case SAVE_CHANNEL:
                return { ...state, loading: true};
        case SAVE_CHANNEL_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };

            case UPDATE_CHANNEL:
                return { ...state, loading: true};
        case UPDATE_CHANNEL_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };
            
      
        default: return { ...state };
    }
}

export default Channel;