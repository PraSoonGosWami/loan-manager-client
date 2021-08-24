import { createSelector } from "reselect";

const selectLoan = (state) => state.loan;

//select loan data state from loan state
export const selectLoanData = createSelector(
  [selectLoan],
  (loan) => loan.loanData
);

//select loan data fetching state from loan state
export const selectLoanFetching = createSelector(
  [selectLoan],
  (loan) => loan.isFetching
);

//select loan data fetching complete state from loan state
export const selectLoanFetchComplete = createSelector(
  [selectLoan],
  (loan) => loan.isFetchingComplete
);

//select loan data fetching failure state from loan state
export const selectLoanFetchFailure = createSelector(
  [selectLoan],
  (loan) => loan.isFetchingFailed
);

//select loan data Posting state from loan state
export const selectLoanPosting = createSelector(
  [selectLoan],
  (loan) => loan.isPosting
);

//select loan data Posting complete state from loan state
export const selectLoanPostComplete = createSelector(
  [selectLoan],
  (loan) => loan.isPostingComplete
);

//select loan data fetching failure state from loan state
export const selectLoanPostFailure = createSelector(
  [selectLoan],
  (loan) => loan.isPostingFailed
);

//select loan SuccessMessage state from loan state
export const selectLoanSuccessMessage = createSelector(
  [selectLoan],
  (loan) => loan.successMessage
);

//select loan ErrorMessage state from loan state
export const selectLoanErrorMessage = createSelector(
  [selectLoan],
  (loan) => loan.errorMessage
);
