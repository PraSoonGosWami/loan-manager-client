//snackbar
import { toast } from "material-react-toastify";
//types
import {
  LOAN_FETCH_START,
  LOAN_FETCH_COMPLETE,
  LOAN_FETCH_ERROR,
  LOAN_POST_START,
  LOAN_POST_COMPLETE,
  LOAN_POST_ERROR,
} from "./loan.types";

const INITIAL_STATE = {
  isFetching: false,
  isFetchingComplete: false,
  isFetchingFailed: false,
  isPosting: false,
  isPostingComplete: false,
  isPostingFailed: false,
  errorMessage: "",
  successMessage: "",
  loanData: [],
};

const loanReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAN_FETCH_START:
      return {
        ...state,
        isFetching: true,
        isFetchingComplete: false,
        isFetchingFailed: false,
        errorMessage: "",
        successMessage: "",
        loanData: [],
      };
    case LOAN_FETCH_COMPLETE:
      return {
        ...state,
        isFetching: false,
        isFetchingComplete: true,
        successMessage: payload?.message,
        loanData: [...payload?.data],
      };
    case LOAN_FETCH_ERROR:
      toast.error(payload?.message);
      return {
        ...state,
        isFetching: false,
        isFetchingFailed: true,
        errorMessage: payload?.message,
      };
    case LOAN_POST_START:
      return {
        ...state,
        isPosting: true,
        isPostingComplete: false,
        isPostingFailed: false,
        errorMessage: "",
        successMessage: "",
      };
    case LOAN_POST_COMPLETE:
      toast.success(payload?.message);
      return {
        ...state,
        isPosting: false,
        isPostingComplete: true,
        successMessage: payload?.message || "",
        loanData: [...payload?.data],
      };
    case LOAN_POST_ERROR:
      return {
        ...state,
        isPosting: false,
        isPostingFailed: true,
        errorMessage: payload?.message,
      };
    default:
      return state;
  }
};

export default loanReducer;
