// @flow
import {
    LOAD_EPISODE,
    LOAD_EPISODE_FAILED,
    LOAD_EPISODE_SUCCESS,
    ONCLICK_EPISODE_MODAL,
    TOGGLE_EPISODE_MODAL,
    SAVE_EPISODE_SUCCESS, SAVE_EPISODE_FAILED,SAVE_EPISODE,
    UPDATE_EPISODE_SUCCESS,UPDATE_EPISODE_FAILED,UPDATE_EPISODE,
    DELETE_EPISODE_SUCCESS, DELETE_EPISODE_FAILED, DELETE_EPISODE,
    SEARCH_EPISODE, SEARCH_EPISODE_SUCCESS
} from '../../constants/actionTypes';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {    
    episodes:[],
    loading: false,
    newEpisode : {   name: '',    description : '',    cphoto : ''},
    episodes :[],
    episodeModal :{show: false,title: 'New Episode',mode : 'Add',data:   {name: '',description: '',cphoto : ''}},
    episodeNotification : {notify:false, message:''}
};

type EpisodeAction = { type: string, payload: {} | string };
type State = { episodes?: {} | null, loading?: boolean, +value?: boolean };

const Episode = (state:State = INIT_STATE, action: AuthAction) => {
    switch (action.type) {

        case LOAD_EPISODE:
            return { ...state,episodeNotification :INIT_STATE.episodeNotification, loading: true};
        case LOAD_EPISODE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOAD_EPISODE_SUCCESS:
             const {response=[]}  =action.payload;
            return { ...state, episodes: response,episodeNotification :INIT_STATE.episodeNotification, loading: false, error: null };
        
        case ONCLICK_EPISODE_MODAL:
            return { ...state, loading: true};
        
        case TOGGLE_EPISODE_MODAL:
            return { ...state, ...action.payload, loading: false};
            case SAVE_EPISODE:
                return { ...state, loading: true};
        case SAVE_EPISODE_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };

        case UPDATE_EPISODE:
            return { ...state, loading: true};
        case UPDATE_EPISODE_SUCCESS:
            return { ...state, ...action.payload, loading: false, error: null };
        
            case DELETE_EPISODE:
                return { ...state, loading: true };
            case DELETE_EPISODE_SUCCESS:
                return { ...state, ...action.payload, loading: false, error: null };
            case DELETE_EPISODE_FAILED:
                return { ...state, ...action.payload,loading: false };  
        
        case SEARCH_EPISODE:
            return { ...state, loading: true};
        case SEARCH_EPISODE_SUCCESS: 
            return { ...state, episodes : [...action.payload], loading: false, error: null };
      
        default: return { ...state };
    }
}

export default Episode;