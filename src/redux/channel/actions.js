// @flow
import {
LOAD_CHANNEL_SUCCESS,
LOAD_CHANNEL_FAILED,
LOAD_CHANNEL,
ONCLICK_MODAL,
TOGGLE_CHANNEL_MODAL,
SAVE_CHANNEL_SUCCESS, SAVE_CHANNEL_FAILED,SAVE_CHANNEL,
UPDATE_CHANNEL_SUCCESS,UPDATE_CHANNEL_FAILED,UPDATE_CHANNEL,
DELETE_CHANNEL_SUCCESS, DELETE_CHANNEL_FAILED, DELETE_CHANNEL,
LOAD_COMPANY_BY_USER_FAILED_FOR_CHANNEL, LOAD_COMPANY_BY_USER_SUCCESS_FOR_CHANNEL, LOAD_COMPANY_BY_USER_FOR_CHANNEL






} from '../../constants/actionTypes';

type ChannelAction = { type: string, payload: {} | string };

export const loadCompanyListForChannel = (payload) => ({
    type: LOAD_COMPANY_BY_USER_FOR_CHANNEL,
    payload: payload
});
export const loadCompanyListForChannalSuccess = (compnaies: {}) => ({
    type: LOAD_COMPANY_BY_USER_SUCCESS_FOR_CHANNEL,
    payload: compnaies
});



export const loadChannel = (userId) => ({
    type: LOAD_CHANNEL,
    payload: userId
});
export const loadChannelSuccess = (channels: {}) => ({
    type: LOAD_CHANNEL_SUCCESS,
    payload: channels
});
export const onclickModal = (payload) => ({
    type: ONCLICK_MODAL,
    payload: payload
});
export const toggleChannelModal = (payload) => ({
    type: TOGGLE_CHANNEL_MODAL,
    payload: payload
});
export const newChannel  = (newChannel) => ({
    type: SAVE_CHANNEL,
    payload: newChannel
});
export const saveChannelSuccess  = (successUpdate) => ({
    type: SAVE_CHANNEL_SUCCESS,
    payload: successUpdate
});


export const updateChannel  = (updateChannel) => ({
    type: UPDATE_CHANNEL,
    payload: updateChannel
});
export const updateChannelSuccess  = (updateChannel) => ({
    type: UPDATE_CHANNEL_SUCCESS,
    payload: updateChannel
});




export const deleteChannel  = (deleteChananl) => ({
    type: DELETE_CHANNEL,
    payload: deleteChananl
});
export const deleteChannelSuccess  = (deleteChananl) => ({
    type: DELETE_CHANNEL_SUCCESS,
    payload: deleteChananl
});
