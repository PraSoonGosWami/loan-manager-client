import { createSelector } from "reselect";

//selects user state from the global app state
const selectUser = (state) => state.user;

//select user data state from user state
export const selectUserData = createSelector(
  [selectUser],
  (user) => user.userData
);

//select authStart state from user state
export const selectUserAuthStart = createSelector(
  [selectUser],
  (user) => user.isAuthStart
);

//select otpSent state from user state
export const selectUserOTPSuccess = createSelector(
  [selectUser],
  (user) => user.isOtpSent
);

//select authSuccess state from user state
export const selectUserAuthSuccess = createSelector(
  [selectUser],
  (user) => user.isAuthSuccess
);

//select authError state from user state
export const selectUserAuthError = createSelector(
  [selectUser],
  (user) => user.isAuthError
);

//select userSuccessMessage state from user state
export const selectUserSuccessMessage = createSelector(
  [selectUser],
  (user) => user.successMessage
);

//select userErrorMessage state from user state
export const selectUserErrorMessage = createSelector(
  [selectUser],
  (user) => user.errorMessage
);
