// @flow
import {
    LOAD_CHANNEL,
    LOAD_CHANNEL_FAILED,
    LOAD_CHANNEL_SUCCESS
} from '../../constants/actionTypes';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    
    channels:[],
    loading: false
};

type ChannelAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Channel = (state:State = INIT_STATE, action: AuthAction) => {
    switch (action.type) {

        case LOAD_CHANNEL:
            return { ...state, loading: true};
        case LOAD_CHANNEL_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOAD_CHANNEL_SUCCESS:
             const {response=[]}  =action.payload;
            return { ...state, channels: response, loading: false, error: null };
      
        default: return { ...state };
    }
}

export default Channel;