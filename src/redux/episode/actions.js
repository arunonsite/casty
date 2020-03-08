// @flow
import {
LOAD_EPISODE_SUCCESS,
LOAD_EPISODE_FAILED,
LOAD_EPISODE,
ONCLICK_EPISODE_MODAL,
TOGGLE_EPISODE_MODAL,
SAVE_EPISODE_SUCCESS, SAVE_EPISODE_FAILED,SAVE_EPISODE,
UPDATE_EPISODE_SUCCESS,UPDATE_EPISODE_FAILED,UPDATE_EPISODE,
DELETE_EPISODE_SUCCESS, DELETE_EPISODE_FAILED, DELETE_EPISODE,
SEARCH_EPISODE, SEARCH_EPISODE_SUCCESS
} from '../../constants/actionTypes';

type EpisodeAction = { type: string, payload: {} | string };



export const loadEpisode = (payload={}) => ({
    type: LOAD_EPISODE,
    payload: payload
});
export const loadEpisodeSuccess = (episodes: {}) => ({
    type: LOAD_EPISODE_SUCCESS,
    payload: episodes
});
export const onclickModal = (payload) => ({
    type: ONCLICK_EPISODE_MODAL,
    payload: payload
});
export const toggleEpisodeModal = (payload) => ({
    type: TOGGLE_EPISODE_MODAL,
    payload: payload
});
export const newEpisode  = (newEpisode) => ({
    type: SAVE_EPISODE,
    payload: newEpisode
});
export const saveEpisodeSuccess  = (successUpdate) => ({
    type: SAVE_EPISODE_SUCCESS,
    payload: successUpdate
});


export const updateEpisode  = (updateEpisode) => ({
    type: UPDATE_EPISODE,
    payload: updateEpisode
});
export const updateEpisodeSuccess  = (updateEpisode) => ({
    type: UPDATE_EPISODE_SUCCESS,
    payload: updateEpisode
});




export const deleteEpisode  = (deleteChananl) => ({
    type: DELETE_EPISODE,
    payload: deleteChananl
});
export const deleteEpisodeSuccess  = (deleteChananl) => ({
    type: DELETE_EPISODE_SUCCESS,
    payload: deleteChananl
});



export const searchEpisode  = (searchEpisode) => ({
    type: SEARCH_EPISODE,
    payload: searchEpisode
});
export const searchEpisodeSuccess  = (searchEpisode) => ({
    type: SEARCH_EPISODE_SUCCESS,
    payload: searchEpisode
});
