// @flow
import {
    LOAD_EPISODE,
    LOAD_EPISODE_FAILED,
    LOAD_EPISODE_SUCCESS,
    ONCLICK_MODAL,
    TOGGLE_EPISODE_MODAL,
    SAVE_EPISODE_SUCCESS, SAVE_EPISODE_FAILED,SAVE_EPISODE
} from '../../constants/actionTypes';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {    
    episodes:[],
    loading: false,
    newepisode : {   name: '',    description : '',    cphoto : ''},
    episodes :[],
    episodeModal :{episode: false,title: 'New episode',mode : 'Add',data:   {name: '',description: '',cphoto : ''}},
    episodeNotification : {notify:false, message:''}
};

type episodeAction = { type: string, payload: {} | string };
type State = { episodes?: {} | null, loading?: boolean, +value?: boolean };

const episode = (state:State = INIT_STATE, action: AuthAction) => {
    switch (action.type) {

        case LOAD_EPISODE:
            return { ...state, loading: true};
        case LOAD_EPISODE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOAD_EPISODE_SUCCESS:
             const {response=[]}  =action.payload;
            return { ...state, episodes: response,episodeNotification :INIT_STATE.episodeNotification, loading: false, error: null };
        
        case ONCLICK_MODAL:
            return { ...state, loading: true};
        
        case TOGGLE_EPISODE_MODAL:
            return { ...state, ...action.payload, loading: false};
            case SAVE_EPISODE:
                return { ...state, loading: true};
        case SAVE_EPISODE_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };
      
        default: return { ...state };
    }
}

export default episode;