// @flow
import {
LOAD_SHOW_SUCCESS,
LOAD_SHOW_FAILED,
LOAD_SHOW,
ONCLICK_MODAL,
TOGGLE_SHOW_MODAL,
SAVE_SHOW_SUCCESS, SAVE_SHOW_FAILED,SAVE_SHOW,
LOAD_CHANNELS_BY_USER, LOAD_CHANNELS_BY_USER_SUCCESS, LOAD_CHANNELS_BY_USER_FAILED,
UPDATE_SHOW_SUCCESS, UPDATE_SHOW_FAILED, UPDATE_SHOW,RESET_SHOW_NOTIFICATION,
DELETE_SHOW_FAILED, DELETE_SHOW_SUCCESS, DELETE_SHOW,
LOAD_COMPANY_BY_USER_FOR_SHOWS, LOAD_COMPANY_BY_USER_SUCCESS_FOR_SHOWS, LOAD_COMPANY_BY_USER_FAILED_FOR_SHOWS,
LOAD_CHANNELS_FOR_SHOWS, LOAD_CHANNELS_FOR_SHOWS_SUCCESS, LOAD_CHANNELS_FOR_SHOWS_FAILED,
SEARCH_SHOW
} from '../../constants/actionTypes';






export const loadCompanyListForShow = (payoad) => ({
    type: LOAD_COMPANY_BY_USER_FOR_SHOWS,
    payload: payoad
});

export const loadCompanyListForShowSuccess = (companies: {}) => ({
    type: LOAD_COMPANY_BY_USER_SUCCESS_FOR_SHOWS,
    payload: companies
});

export const loadChannelsListForShow = (payoad) => ({
    type: LOAD_CHANNELS_FOR_SHOWS,
    payload: payoad
});

export const loadChannelsListForShowSuccess = (channels: {}) => ({
    type: LOAD_CHANNELS_FOR_SHOWS_SUCCESS,
    payload: channels
});


export const loadShows = (userId) => ({
    type: LOAD_SHOW,
    payload: userId
});

export const loadShowSuccess = (shows: {}) => ({
    type: LOAD_SHOW_SUCCESS,
    payload: shows
});






export const onclickModal = (payload) => ({
    type: ONCLICK_MODAL,
    payload: payload
});

export const toggleShowModal = (payload) => ({
    type: TOGGLE_SHOW_MODAL,
    payload: payload
});
export const newShow  = (newChannel) => ({
    type: SAVE_SHOW,
    payload: newChannel
});
export const saveShowSuccess  = (successUpdate) => ({
    type: SAVE_SHOW_SUCCESS,
    payload: successUpdate
});


export const updateShow  = (updateShow) => ({
    type: UPDATE_SHOW,
    payload: updateShow
});

export const updateShowSuccess  = (successUpdate) => ({
    type: UPDATE_SHOW_SUCCESS,
    payload: successUpdate
});

export const updateShowFailed  = (successFailed) => ({
    type: UPDATE_SHOW_FAILED,
    payload: successFailed
});

export const resetShowNotification  = (resetNotification) => ({
    type: RESET_SHOW_NOTIFICATION,
    payload: resetNotification
});

//
export const deleteShow  = (deleteShow) => ({
    type: DELETE_SHOW,
    payload: deleteShow
});

export const deleteShowSuccess  = (deleteSuccess) => ({
    type: DELETE_SHOW_SUCCESS,
    payload: deleteSuccess
});

export const deleteShowFailed  = (deleteFailed) => ({
    type: DELETE_SHOW_FAILED,
    payload: deleteFailed
});

export const searchShow  = (searchEpisode) => ({
    type: SEARCH_SHOW,
    payload: searchEpisode
});





