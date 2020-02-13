import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import ChannelPageReducer from './channel/reducers';
import UserPageReducer from './user/reducers';

export default combineReducers({
    Auth,
    ChannelPageReducer,
    UserPageReducer
});