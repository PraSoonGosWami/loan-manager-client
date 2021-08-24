import {
  USER_AUTH_START,
  USER_OTP_COMPLETE,
  USER_AUTH_COMPLETE,
  USER_AUTH_FAILURE,
} from "./user.types";

/**
 * @description User authenication start
 * @param {}
 */
export const userAuthStart = () => {
  return {
    type: USER_AUTH_START,
  };
};

/**
 * @description User otp sent success
 * @param {payload}
 */
export const userOTPComplete = (payload) => {
  return {
    type: USER_OTP_COMPLETE,
    payload,
  };
};

/**
 * @description User authenication success
 * @param {payload}
 */
export const userAuthComplete = (payload) => {
  return {
    type: USER_AUTH_COMPLETE,
    payload,
  };
};

/**
 * @description User authenication failure
 * @param {error}
 */
export const userAuthFailure = (payload) => {
  return {
    type: USER_AUTH_FAILURE,
    payload,
  };
};
