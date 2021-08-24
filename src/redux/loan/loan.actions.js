import {
  LOAN_FETCH_START,
  LOAN_FETCH_COMPLETE,
  LOAN_FETCH_ERROR,
  LOAN_POST_START,
  LOAN_POST_COMPLETE,
  LOAN_POST_ERROR,
} from "./loan.types";

/**
 * @description Loan fetch start
 * @param {}
 */
export const loanFetchStart = () => {
  return {
    type: LOAN_FETCH_START,
  };
};

/**
 * @description Loan fetch success
 * @param {payload}
 */
export const loanFetchComplete = (payload) => {
  return {
    type: LOAN_FETCH_COMPLETE,
    payload,
  };
};

/**
 * @description Loan fetch failure
 * @param {payload}
 */
export const loanFetchFailure = (payload) => {
  return {
    type: LOAN_FETCH_ERROR,
    payload,
  };
};

/**
 * @description Loan post start
 * @param {}
 */
export const loanPostStart = () => {
  return {
    type: LOAN_POST_START,
  };
};

/**
 * @description Loan post complete
 * @param {payload}
 */
export const loanPostComplete = (payload) => {
  return {
    type: LOAN_POST_COMPLETE,
    payload,
  };
};

/**
 * @description Loan Post failure
 * @param {payload}
 */
export const loanPostFailure = (payload) => {
  return {
    type: LOAN_POST_ERROR,
    payload,
  };
};
