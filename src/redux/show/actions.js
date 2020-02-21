// @flow
import {
LOAD_SHOW_SUCCESS,
LOAD_SHOW_FAILED,
LOAD_SHOW,
ONCLICK_MODAL,
TOGGLE_SHOW_MODAL,
SAVE_SHOW_SUCCESS, SAVE_SHOW_FAILED,SAVE_SHOW
} from '../../constants/actionTypes';





export const loadShows = (userId) => ({
    type: LOAD_SHOW,
    payload: userId
});

export const loadShowSuccess = (channels: {}) => ({
    type: LOAD_SHOW_SUCCESS,
    payload: channels
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

