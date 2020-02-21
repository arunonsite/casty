// @flow
import {
LOAD_EPISODE_SUCCESS,
LOAD_EPISODE_FAILED,
LOAD_EPISODE,
ONCLICK_MODAL,
TOGGLE_EPISODE_MODAL,
SAVE_EPISODE_SUCCESS, SAVE_EPISODE_FAILED,SAVE_EPISODE
} from '../../constants/actionTypes';

type ChannelAction = { type: string, payload: {} | string };



export const loadEpisodes = (userId) => ({
    type: LOAD_EPISODE,
    payload: userId
});

export const loadEpisodesSuccess = (channels: {}) => ({
    type: LOAD_EPISODE_SUCCESS,
    payload: channels
});


export const onclickModal = (payload) => ({
    type: ONCLICK_MODAL,
    payload: payload
});

export const toggleChannelModal = (payload) => ({
    type: TOGGLE_EPISODE_MODAL,
    payload: payload
});
export const newChannel  = (newChannel) => ({
    type: SAVE_EPISODE,
    payload: newChannel
});

export const saveChannelSuccess  = (successUpdate) => ({
    type: SAVE_EPISODE_SUCCESS,
    payload: successUpdate
});

