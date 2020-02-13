import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import channelSaga from './channel/saga';
import userSaga from './user/saga';


export default function* rootSaga(getState) {
    yield all([
        authSaga(),
        channelSaga(),
        userSaga(),
    ]);
}
