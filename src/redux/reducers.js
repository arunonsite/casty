import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import ChannelPageReducer from './channel/reducers';
import UserPageReducer from './user/reducers';
import ShowPageReducer from './show/reducers';
import CompanyPageReducer from './company/reducers';
import EpisodePageReducer from './episode/reducers';
import DepartmentPageReducer from './department/reducers';
import DashboardReducer from './dashboard/reducers';


export default combineReducers({
    Auth,
    ChannelPageReducer,
    UserPageReducer,
    ShowPageReducer,
    CompanyPageReducer,
    EpisodePageReducer,
    DepartmentPageReducer,
    DashboardReducer
});