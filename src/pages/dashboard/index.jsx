import { lazy, useEffect, useState, Suspense } from "react";
//redux
import { connect } from "react-redux";
//reslect
import { createStructuredSelector } from "reselect";
//material ui
import { Container, Fab } from "@material-ui/core";
//material icons
import AddIcon from "@material-ui/icons/Add";
//constants
import { ADD_LOAN_QUERY_PARAM } from "../../constant";
//action creators
import {
  getLoanData,
  deleteLoanApplication,
} from "../../redux/loan/loan.actionCreators";
import { checkIsAdmin } from "../../redux/admin/admin.actionCreators";
//selectors
import {
  selectLoanData,
  selectLoanFetching,
  selectLoanFetchComplete,
  selectLoanFetchFailure,
  selectLoanPostComplete,
  selectLoanPostFailure,
  selectLoanSuccessMessage,
  selectLoanErrorMessage,
} from "../../redux/loan/loan.selectors";
import { selectIsAdmin } from "../../redux/admin/admin.selectors";

//components
import NavBar from "../../components/navBar";
import Spinner from "../../components/spinner";
//style sheet
import classes from "./styles.module.css";
import LoanItem from "../../components/loanItem";

const CustomModal = lazy(() => import("../../components/customModal"));

const Dashboard = ({
  location,
  history,
  data,
  isFetching,
  fetchComplete,
  postComplete,
  getData,
  deleteData,
  checkIsAdmin,
  isAdmin,
}) => {
  const [showLoanDialog, setShowLoanDialog] = useState(false);
  const [updatePayload, setUpdatePayload] = useState({
    data: null,
    index: null,
  });

  //fetches loan data when mounted
  useEffect(() => {
    getData();
    checkIsAdmin();
  }, []);

  //checks for query params in URL
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    query.get(ADD_LOAN_QUERY_PARAM) === "true"
      ? setShowLoanDialog(true)
      : setShowLoanDialog(false);
  }, [location]);

  //check if post or update has been complete then closes the dialog
  useEffect(() => {
    if (postComplete) closeLoanDialogHandler();
  }, [postComplete]);

  //loan dialog handlers
  const showLoanDialogHandler = () => {
    history.push({ search: `${ADD_LOAN_QUERY_PARAM}=true` });
  };
  const closeLoanDialogHandler = () => {
    setUpdatePayload({ data: null, index: null });
    history.replace({ search: `${ADD_LOAN_QUERY_PARAM}=false` });
  };

  //updates item by index
  const updateLoanApplication = (data, index) => {
    setUpdatePayload({
      data,
      index,
    });
    showLoanDialogHandler();
  };

  //delete item by index
  const deleteItem = (id, index) => {
    deleteData(id, index);
  };

  return (
    <div className={classes.dashboard}>
      <NavBar title="Loan Manager" history={history} isAdmin={isAdmin} />
      <Container maxWidth="md" className={classes.dashboardContent}>
        {isFetching && <Spinner />}
        {fetchComplete &&
          (data.length ? (
            data.map((loan, index) => {
              const id = loan._id;
              return (
                <LoanItem
                  key={id}
                  loan={loan}
                  updateItem={() => updateLoanApplication(loan, index)}
                  deleteItem={() => deleteItem(id, index)}
                />
              );
            })
          ) : (
            <h2 className="noDataText">
              Seems like you dont have any loan application. Go ahead and create
              a new one
            </h2>
          ))}
      </Container>
      <Suspense fallback={<Spinner />}>
        {showLoanDialog && (
          <CustomModal
            showDialog={showLoanDialog}
            closeDialog={closeLoanDialogHandler}
            updatePayload={updatePayload}
          />
        )}
      </Suspense>
      <Fab
        color="primary"
        onClick={showLoanDialogHandler}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  data: selectLoanData,
  isFetching: selectLoanFetching,
  fetchError: selectLoanFetchFailure,
  fetchComplete: selectLoanFetchComplete,
  postComplete: selectLoanPostComplete,
  postError: selectLoanPostFailure,
  isAdmin: selectIsAdmin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(getLoanData()),
    deleteData: (loanId, index) =>
      dispatch(deleteLoanApplication({ loanId }, index)),
    checkIsAdmin: () => dispatch(checkIsAdmin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
