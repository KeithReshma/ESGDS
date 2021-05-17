import { combineReducers } from 'redux';
import login from './Login';
import otp from './Otp';
import forgotPassword from './ForgotPassword';
import companylist from './CompaniesList';
import employee from './Employee';
import client from './Client';
import company from './Company';
import updatePassword from './UpdatePassword';
import createbatch from './BatchCreate';

const rootReducer = combineReducers({
  login,
  otp,
  forgotPassword,
  companylist,
  employee,
  client,
  company,
  updatePassword,
  createbatch,
});

export default rootReducer;
