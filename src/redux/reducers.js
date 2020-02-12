import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import ChannelReducer from './channel/reducers';

export default combineReducers({
    Auth,
    ChannelReducer
});