//snackbar
import { toast } from "material-react-toastify";
//action types
import {
  ADMIN_CHECK_START,
  ADMIN_CHECK_COMPLETE,
  ADMIN_CHECK_ERROR,
  ADMIN_FETCH_START,
  ADMIN_FETCH_COMPLETE,
  ADMIN_FETCH_ERROR,
  ADMIN_UPDATE_START,
  ADMIN_UPDATE_COMPLETE,
  ADMIN_UPDATE_ERROR,
} from "./admin.types";

//inital state
const INITIAL_STATE = {
  isFetching: false,
  isFetchingComplete: false,
  isFetchingFailed: false,
  isUpdating: false,
  isUpdatingComplete: false,
  isUpdatingFailed: false,
  errorMessage: "",
  successMessage: "",
  isAdmin: false,
  adminData: [],
};

const adminReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_CHECK_START:
      return {
        ...state,
        isFetching: true,
        isFetchingComplete: false,
        isFetchingFailed: false,
        isAdmin: false,
        errorMessage: "",
      };
    case ADMIN_CHECK_COMPLETE:
      return {
        ...state,
        isFetching: false,
        isFetchingComplete: true,
        isAdmin: payload?.isAdmin || false,
      };
    case ADMIN_CHECK_ERROR:
      return {
        ...state,
        isFetching: false,
        isFetchingFailed: true,
        isAdmin: false,
        errorMessage: payload?.message,
      };
    case ADMIN_FETCH_START:
      return {
        ...state,
        isFetching: true,
        isFetchingComplete: false,
        isFetchingFailed: false,
        errorMessage: "",
        successMessage: "",
        adminData: [],
      };
    case ADMIN_FETCH_COMPLETE:
      return {
        ...state,
        isFetching: false,
        isFetchingComplete: true,
        successMessage: payload?.message,
        adminData: [...payload?.data],
      };
    case ADMIN_FETCH_ERROR:
      toast.error(payload?.message);
      return {
        ...state,
        isFetching: false,
        isFetchingFailed: true,
        errorMessage: payload?.message,
      };
    case ADMIN_UPDATE_START:
      return {
        ...state,
        isUpdating: true,
        isUpdatingComplete: false,
        isUpdatingFailed: false,
        errorMessage: "",
        successMessage: "",
      };
    case ADMIN_UPDATE_COMPLETE:
      toast.success(payload?.message);
      return {
        ...state,
        isUpdating: false,
        isUpdatingComplete: true,
        successMessage: payload?.message,
        adminData: [...payload?.data],
      };
    case ADMIN_UPDATE_ERROR:
      toast.error(payload?.message);
      return {
        ...state,
        isUpdating: false,
        isUpdatingFailed: true,
        errorMessage: payload?.message,
      };
    default:
      return state;
  }
};

export default adminReducer;
