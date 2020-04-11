import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import channelSaga from './channel/saga';
import userSaga from './user/saga';
import showSaga from './show/saga';
import episodeSaga from './episode/saga';
import companySaga from './company/saga';
import departmentSaga from './department/saga';
import dashboardSaga from './dashboard/saga';


export default function* rootSaga(getState) {
    yield all([
        authSaga(),
        channelSaga(),
        userSaga(),
        showSaga(),
        episodeSaga(),
        companySaga(),
        departmentSaga(),
        dashboardSaga()
    ]);
}
