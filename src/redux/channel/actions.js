// @flow
import {
LOAD_CHANNEL_SUCCESS,
LOAD_CHANNEL_FAILED,
LOAD_CHANNEL
} from '../../constants/actionTypes';

type ChannelAction = { type: string, payload: {} | string };



export const loadChannel = (userId) => ({
    type: LOAD_CHANNEL,
    payload: userId
});

export const loadChannelSuccess = (channels: {}) => ({
    type: LOAD_CHANNEL_SUCCESS,
    payload: channels
});

