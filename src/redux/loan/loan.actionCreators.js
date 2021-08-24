//api
import {
  createLoanService,
  updateLoanService,
  getLoanByUserIdService,
  deleteLoanService,
  getLoanForApprovalService,
  approveLoanService,
} from "../../api";
//constant
import { DEFAULT_SERVER_ERROR_MESSAGE } from "../../constant";
//actions
import {
  loanFetchStart,
  loanFetchComplete,
  loanFetchFailure,
  loanPostStart,
  loanPostComplete,
  loanPostFailure,
} from "./loan.actions";

/**
 * @description gets all loan applications for a user
 * @param {}
 */
export const getLoanData = () => (dispatch) => {
  dispatch(loanFetchStart());
  getLoanByUserIdService()
    .then((res) => {
      dispatch(loanFetchComplete({ ...res?.data }));
    })
    .catch((err) => {
      dispatch(
        loanFetchFailure({
          message: err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
        })
      );
    });
};

/**
 * @description create a loan application
 * @param {loanDara}
 */
export const createLoanApplication = (loanData) => (dispatch, getState) => {
  const prevState = getState().loan;
  const prevLoanData = [...prevState.loanData];
  dispatch(loanPostStart());
  createLoanService(loanData)
    .then((res) => {
      const { data, message } = res?.data;
      prevLoanData.unshift(data);
      dispatch(loanPostComplete({ data: prevLoanData, message }));
    })
    .catch((err) => {
      dispatch(
        loanPostFailure({
          message: err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
        })
      );
    });
};

/**
 * @description upadte a loan application
 * @param {loanData, index}
 */
export const updateLoanApplication =
  (loanData, index) => (dispatch, getState) => {
    const prevState = getState().loan;
    const prevLoanData = [...prevState.loanData];
    dispatch(loanPostStart());
    updateLoanService(loanData)
      .then((res) => {
        const { data, message } = res?.data;
        prevLoanData[index] = data;
        dispatch(loanPostComplete({ data: prevLoanData, message }));
      })
      .catch((err) => {
        dispatch(
          loanPostFailure({
            message:
              err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
          })
        );
      });
  };

/**
 * @description delete a loan application by id
 * @param {loanId, index}
 */
export const deleteLoanApplication =
  (loanId, index) => (dispatch, getState) => {
    const prevState = getState().loan;
    const prevLoanData = [...prevState.loanData];
    dispatch(loanPostStart());
    deleteLoanService(loanId)
      .then((res) => {
        prevLoanData.splice(index, 1);
        dispatch(loanPostComplete({ ...res?.data, data: prevLoanData }));
      })
      .catch((err) => {
        dispatch(
          loanPostFailure({
            message:
              err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
          })
        );
      });
  };

/**
 * @description gets all loan application for approval
 * @param {}
 */
export const getLoansForApproval = () => (dispatch) => {
  dispatch(loanFetchStart());
  getLoanForApprovalService()
    .then((res) => {
      dispatch(loanFetchComplete({ ...res?.data }));
    })
    .catch((err) => {
      dispatch(
        loanFetchFailure({
          message: err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
        })
      );
    });
};

/**
 * @description approve or rejects an application
 * @param {}
 */
export const updateLoanStatus = (loanData, index) => (dispatch, getState) => {
  const prevState = getState().loan;
  const prevLoanData = [...prevState.loanData];
  dispatch(loanPostStart());
  approveLoanService(loanData)
    .then((res) => {
      const { data, message } = res?.data;
      data ? (prevLoanData[index] = data) : prevLoanData.splice(index, 1);
      dispatch(loanPostComplete({ data: prevLoanData, message }));
    })
    .catch((err) => {
      dispatch(
        loanPostFailure({
          message: err?.response?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
        })
      );
    });
};
