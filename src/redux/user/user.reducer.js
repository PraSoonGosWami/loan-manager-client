//types
import {
  USER_AUTH_START,
  USER_OTP_COMPLETE,
  USER_AUTH_COMPLETE,
  USER_AUTH_FAILURE,
} from "./user.types";

const INITIAL_STATE = {
  isAuthStart: false,
  isOtpSent: false,
  isAuthSuccess: false,
  isAuthError: false,
  userData: null,
  errorMessage: "",
  successMessage: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_AUTH_START:
      return {
        ...state,
        isAuthStart: true,
        isAuthSuccess: false,
        isAuthError: false,
        userData: null,
        errorMessage: "",
        successMessage: "",
      };
    case USER_OTP_COMPLETE:
      return {
        ...state,
        isAuthStart: false,
        isOtpSent: true,
        successMessage: payload?.message,
      };
    case USER_AUTH_COMPLETE:
      return {
        ...state,
        isAuthStart: false,
        isAuthSuccess: true,
        userData: payload?.data,
        successMessage: payload?.message,
      };
    case USER_AUTH_FAILURE:
      return {
        ...state,
        isAuthStart: false,
        isAuthError: true,
        errorMessage: payload?.message,
      };

    default:
      return state;
  }
};

export default userReducer;
