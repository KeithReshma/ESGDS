import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/DpCodeData';
import { doGet, doPost, doPut } from '../utils/fetchWrapper';

export function* dpCodeDataGetRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getDpCodeData}/${data.taskId}/${data.dpCodeId}`);
    yield put(actionCreators.dpCodeDataGetSuccess(response));
  } catch (error) {
    yield put(actionCreators.dpCodeDataGetFailure(error));
  }
}

export function* controversyDpCodeDataGetRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getControversyDpCodeData}/${data.companyId}/${data.dpCodeId}`);
    yield put(actionCreators.controversyDpCodeDataGetSuccess(response));
  } catch (error) {
    yield put(actionCreators.controversyDpCodeDataGetFailure(error));
  }
}

export function* controversyDpCodeDataPostRequest(data) {
  try {
    const response = yield doPost(`${envConfig.apiEndPoints.postControversyDpCodeData}`, data.payload);
    yield put(actionCreators.controversyDpCodeDataPostSuccess(response));
  } catch (error) {
    yield put(actionCreators.controversyDpCodeDataPostFailure(error));
  }
}

export function* controversyDpCodeDataUpdateRequest(data) {
  try {
    const response = yield doPut(`${envConfig.apiEndPoints.updateControversyDpCodeData}/${data.controversyId}`, data.payload);
    yield put(actionCreators.controversyDpCodeDataUpdateSuccess(response));
  } catch (error) {
    yield put(actionCreators.controversyDpCodeDataUpdateFailure(error));
  }
}

export function* getDpCodeDataWatchers() {
  yield [
    takeLatest('DPCODEDATA_GET_REQUEST', dpCodeDataGetRequest),
    takeLatest('CONTROVERSY_DPCODEDATA_GET_REQUEST', controversyDpCodeDataGetRequest),
    takeLatest('CONTROVERSY_DPCODEDATA_POST_REQUEST', controversyDpCodeDataPostRequest),
    takeLatest('CONTROVERSY_DPCODEDATA_UPDATE_REQUEST', controversyDpCodeDataUpdateRequest),
  ];
}
