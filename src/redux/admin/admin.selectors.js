import { createSelector } from "reselect";

const selectAdmin = (state) => state.admin;

//select isAdmin data state from admin state
export const selectIsAdmin = createSelector(
  [selectAdmin],
  (admin) => admin.isAdmin
);

//select admin data state from admin state
export const selectAdminData = createSelector(
  [selectAdmin],
  (admin) => admin.adminData
);

//select admin data fetching state from admin state
export const selectAdminFetching = createSelector(
  [selectAdmin],
  (admin) => admin.isFetching
);

//select admin data fetching complete state from admin state
export const selectAdminFetchComplete = createSelector(
  [selectAdmin],
  (admin) => admin.isFetchingComplete
);

//select admin data fetching failure state from admin state
export const selectAdminFetchFailure = createSelector(
  [selectAdmin],
  (admin) => admin.isFetchingFailed
);

//select admin data Updating state from admin state
export const selectAdminUpdateing = createSelector(
  [selectAdmin],
  (admin) => admin.isUpdating
);

//select admin data Updating complete state from admin state
export const selectAdminUpdateComplete = createSelector(
  [selectAdmin],
  (admin) => admin.isUpdatingComplete
);

//select admin data fetching failure state from admin state
export const selectAdminUpdateFailure = createSelector(
  [selectAdmin],
  (admin) => admin.isUpdatingFailed
);

//select admin SuccessMessage state from admin state
export const selectAdminSuccessMessage = createSelector(
  [selectAdmin],
  (admin) => admin.successMessage
);

//select admin ErrorMessage state from admin state
export const selectAdminErrorMessage = createSelector(
  [selectAdmin],
  (admin) => admin.errorMessage
);
