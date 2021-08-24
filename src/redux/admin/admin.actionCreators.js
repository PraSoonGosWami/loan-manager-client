//api
import {
  checkIfAdminService,
  getAllAdminsService,
  addAdminService,
  deleteAdminService,
} from "../../api";
//constant
import { DEFAULT_SERVER_ERROR_MESSAGE } from "../../constant";
//actions
import {
  adminCheckStart,
  adminCheckComplete,
  adminCheckFailure,
  adminFetchStart,
  adminFetchComplete,
  adminFetchFailure,
  adminUpdateStart,
  adminUpdateComplete,
  adminUpdateFailure,
} from "./admin.actions";

/**
 * @description checks if current user is admin
 * @param {}
 */
export const checkIsAdmin = () => (dispatch) => {
  dispatch(adminCheckStart());
  checkIfAdminService()
    .then((res) => {
      dispatch(adminCheckComplete({ ...res?.data }));
    })
    .catch((err) => {
      dispatch(
        adminCheckFailure({
          message: err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
        })
      );
    });
};

/**
 * @description get all admins from admin group
 * @param {}
 */
export const getAllAdmins = () => (dispatch) => {
  dispatch(adminFetchStart());
  getAllAdminsService()
    .then((res) => {
      dispatch(adminFetchComplete({ ...res?.data }));
    })
    .catch((err) => {
      dispatch(
        adminFetchFailure({
          message: err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
        })
      );
    });
};
/**
 * @description adds admin to the admin group
 * @param {email}
 */
export const addAdminToGroup = (email) => (dispatch, getState) => {
  const prevState = getState().admin;
  const prevAdminData = [...prevState.adminData];
  dispatch(adminUpdateStart());
  addAdminService(email)
    .then((res) => {
      const { data, message } = res?.data;
      prevAdminData.unshift(data);
      dispatch(adminUpdateComplete({ data: prevAdminData, message }));
    })
    .catch((err) => {
      dispatch(
        adminUpdateFailure({
          message: err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
        })
      );
    });
};
/**
 * @description delete an admin from admin group
 * @param {id, index}
 */
export const deleteAdmin = (id, index) => (dispatch, getState) => {
  const prevState = getState().admin;
  const prevAdminData = [...prevState.adminData];
  dispatch(adminUpdateStart());
  deleteAdminService(id)
    .then((res) => {
      prevAdminData.splice(index, 1);
      dispatch(adminUpdateComplete({ ...res?.data, data: prevAdminData }));
    })
    .catch((err) => {
      dispatch(
        adminUpdateFailure({
          message: err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
        })
      );
    });
};
