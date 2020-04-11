// @flow
import {
    LOAD_DASHBOARD,
    LOAD_DASHBOARD_SUCCESS 
} from '../../constants/actionTypes';





export const loadDashbaord = (dateInfo) => ({
    type: LOAD_DASHBOARD,
    payload: dateInfo
});

export const loadDashbaordSuccess = (shows: {}) => ({
    type: LOAD_DASHBOARD_SUCCESS,
    payload: shows
});




