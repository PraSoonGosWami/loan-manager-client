import { useEffect, useRef, useState } from "react";
//redux
import { connect } from "react-redux";
//reslect
import { createStructuredSelector } from "reselect";
//material ui
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Container,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
//material icons
import DoneIcon from "@material-ui/icons/Done";
//alerts
//action creators
import {
  getAllAdmins,
  addAdminToGroup,
  deleteAdmin,
} from "../../redux/admin/admin.actionCreators";
import {
  getLoansForApproval,
  updateLoanStatus,
} from "../../redux/loan/loan.actionCreators";
//selectors
import {
  selectAdminData,
  selectAdminFetching,
  selectAdminUpdateing,
} from "../../redux/admin/admin.selectors";
import {
  selectLoanData,
  selectLoanFetching,
  selectLoanFetchComplete,
} from "../../redux/loan/loan.selectors";
//components
import LoanItem from "../../components/loanItem";
import NavBar from "../../components/navBar";
import Spinner from "../../components/spinner";
//utils
import checkDuplicate from "../../utils/check-duplicate";
import validateEmail from "../../utils/validate-email";
//style sheet
import classes from "./styles.module.css";

const Admin = ({
  history,
  adminData,
  adminFetchStart,
  getAllAdmins,
  addAdminToGroup,
  deleteAdmin,
  loanData,
  loanFetchStart,
  loanFetchComplete,
  getLoanData,
  updateLoanStatus,
}) => {
  const [inputError, setInputError] = useState("");
  const adminFormRef = useRef();

  //gets admin from admin group
  useEffect(() => {
    getAllAdmins();
    getLoanData();
  }, []);

  //add admin handler
  const addAdminHandler = (event) => {
    event.preventDefault();
    setInputError("");
    const email = event.target[0].value;
    if (!validateEmail(email)) {
      setInputError("Invalid email");
      return;
    }
    if (checkDuplicate(adminData, email)) {
      setInputError("Email already in admin group");
      return;
    }
    addAdminToGroup(email);
    adminFormRef.current.reset();
  };
  return (
    <div>
      <NavBar title="Welcome Admin" history={history} showBack />
      <Container maxWidth="lg" className={classes.adminContainer}>
        {adminData.length > 0 && (
          <Card elevation={5} className={classes.admins}>
            <CardContent>
              <Typography>Current Admins</Typography>
              {adminFetchStart && <Spinner position="absolute" />}
              {adminData.map((admin, index) => {
                const { _id, email } = admin;
                return (
                  <Chip
                    key={_id}
                    avatar={
                      <Avatar>
                        {email.toString().charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    label={email}
                    onDelete={
                      adminData.length === 1
                        ? null
                        : () => deleteAdmin(_id, index)
                    }
                    variant="outlined"
                    style={{ margin: 6 }}
                  />
                );
              })}
              <form
                className={classes.addAdmin}
                onSubmit={addAdminHandler}
                ref={adminFormRef}
              >
                <TextField
                  variant="outlined"
                  label="Add admin"
                  margin="dense"
                  type="email"
                  fullWidth
                  helperText={inputError}
                  error={Boolean(inputError)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit">
                          <DoneIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </CardContent>
          </Card>
        )}
        <main>
          {loanFetchStart && <Spinner position="absolute" />}
          {loanFetchComplete &&
            (loanData.length ? (
              loanData.map((loan, index) => {
                return (
                  <LoanItem
                    key={loan._id}
                    id={loan._id}
                    loan={loan}
                    index={index}
                    isAdmin
                    row
                    updateLoanStatus={updateLoanStatus}
                  />
                );
              })
            ) : (
              <h2 className="noDataText">
                Wohoo! It seems clear here. No pending applications{" "}
              </h2>
            ))}
        </main>
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminData: selectAdminData,
  adminFetchStart: selectAdminFetching,
  loanData: selectLoanData,
  loanFetchStart: selectLoanFetching,
  loanFetchComplete: selectLoanFetchComplete,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAdmins: () => dispatch(getAllAdmins()),
    addAdminToGroup: (email) => dispatch(addAdminToGroup({ email })),
    deleteAdmin: (_id, index) => dispatch(deleteAdmin({ _id }, index)),
    getLoanData: () => dispatch(getLoansForApproval()),
    updateLoanStatus: (_id, verified, adminComment, index) =>
      dispatch(
        updateLoanStatus({ loanId: _id, verified, adminComment }, index)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
