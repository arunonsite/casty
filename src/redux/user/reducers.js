// @flow
import {
    LOAD_USERS,
    LOAD_USERS_FAILED,
    LOAD_USERS_SUCCESS
} from '../../constants/actionTypes';



const INIT_STATE = {
    
    users:[],
    loading: false
};

type UserAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const User = (state:State = INIT_STATE, action: UserAction) => {
    switch (action.type) {

        case LOAD_USERS:
            return { ...state, loading: true};
        case LOAD_USERS_SUCCESS:
            
            const {response=[]}  =action.payload;
            return { ...state, users: response , loading: false };
        case LOAD_USERS_FAILED:
            return { ...state, error: action.payload, loading: false, error: null };
      
        default: return { ...state };
    }
}

export default User;