//api
import { userAuthService, userVerificationService } from "../../api";
//constant
import {
  LOCAL_STORAGE_USER_DATA_KEY,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "../../constant";
//actions
import {
  userAuthStart,
  userOTPComplete,
  userAuthComplete,
  userAuthFailure,
} from "./user.actions";

/**
 * @description User authentcation
 * @param {} userData - email
 */

export const authenticateUser = (userData, callback) => (dispatch) => {
  dispatch(userAuthStart());
  userAuthService(userData)
    .then((res) => {
      console.log(res.data);
      dispatch(userOTPComplete({ message: res?.data?.message }));
    })
    .catch((err) => {
      dispatch(
        userAuthFailure({
          message: err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
        })
      );
    });
};

/**
 * @description User verification
 * @param {} userData - email, otp
 */

export const verifyUser = (userData, callback) => (dispatch) => {
  dispatch(userAuthStart());
  userVerificationService(userData)
    .then((res) => {
      const { token, data } = res?.data;
      if (token)
        localStorage.setItem(
          LOCAL_STORAGE_USER_DATA_KEY,
          JSON.stringify({ token, profile: data })
        );
      dispatch(userAuthComplete({ ...res?.data }));
    })
    .catch((err) => {
      dispatch(
        userAuthFailure({
          message: err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
        })
      );
    });
};

/**
 * @description Checks if user is already logged in
 *
 */
export const checkAuthState = () => (dispatch) => {
  dispatch(userAuthStart());
  let data = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);

  if (data) {
    data = JSON.parse(data);
    dispatch(userAuthComplete({ data: data.profile, message: "Welcome" }));
  } else {
    dispatch(userAuthFailure());
  }
};

/**
 * @description user sign out action
 *
 */
export const signOutUser = () => (dispatch) => {
  localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
  window?.location?.reload();
};
