import React from "react";
//redux
import { connect } from "react-redux";
//reslect
import { createStructuredSelector } from "reselect";
//yup
import { object, string, number, boolean } from "yup";
//formik
import { Field, Form, Formik } from "formik";
//Material ui
import { Box, TextField, Button } from "@material-ui/core";
//action creators
import {
  createLoanApplication,
  updateLoanApplication,
} from "../../redux/loan/loan.actionCreators";
//selectors
import {
  selectLoanPosting,
  selectLoanPostFailure,
  selectLoanErrorMessage,
} from "../../redux/loan/loan.selectors";
//components
import Alerts from "../alert";
import CustomCheckbox from "../customCheckbox";

//form inital values
const initalValues = {
  title: "",
  applicantName: "",
  address: "",
  phone: "",
  email: "",
  amount: "",
  installment: "",
  fixed: false,
};

const LoanForm = ({
  data,
  index,
  isPosting,
  postError,
  errorMessage,
  postData,
  updateData,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={data || initalValues}
      validationSchema={object({
        title: string().required("Enter title for your loan application"),
        applicantName: string().required("Enter applicant name"),
        address: string().required("Enter address"),
        phone: number()
          .typeError("Invalid phone number")
          .required("Enter phone number")
          .test(
            "len",
            "Invalid phone number",
            (val) => val?.toString().length === 10
          ),
        email: string().required("Enter email"),
        amount: number()
          .typeError("Only numbers are allowed")
          .required("Enter loan amount"),
        installment: number()
          .typeError("Only numbers are allowed")
          .required("Enter EMI"),
        fixed: boolean(),
      })}
      onSubmit={(values) => {
        data ? updateData(values, index) : postData(values);
      }}
    >
      {({ errors, isValid, touched, dirty }) => (
        <Form disabled={isPosting}>
          <Box height={24} />
          {postError && <Alerts type="error" message={errorMessage} />}
          <Field
            name="title"
            type="text"
            as={TextField}
            color="primary"
            label="Application title"
            variant="outlined"
            placeholder="Ex. My Home Loan Application"
            InputLabelProps={{
              shrink: true,
            }}
            required
            error={Boolean(errors.title) && Boolean(touched.title)}
            helperText={Boolean(touched.title) && errors.title}
            fullWidth
          />
          <Box height={18} />
          <Field
            name="applicantName"
            type="name"
            as={TextField}
            color="primary"
            label="Name fo the Applicant"
            variant="outlined"
            placeholder="Ex. Jhon Doe"
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={
              Boolean(errors.applicantName) && Boolean(touched.applicantName)
            }
            helperText={Boolean(touched.applicantName) && errors.applicantName}
            fullWidth
          />
          <Box height={18} />
          <Field
            name="email"
            type="email"
            as={TextField}
            color="primary"
            variant="outlined"
            placeholder="Ex. jhon@gmail.com"
            label="Email"
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(errors.email) && Boolean(touched.email)}
            helperText={Boolean(touched.email) && errors.email}
            fullWidth
          />
          <Box height={18} />
          <Field
            name="amount"
            type="number"
            as={TextField}
            color="primary"
            variant="outlined"
            placeholder="Ex. 450000"
            label="Loan Amount"
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(errors.amount) && Boolean(touched.amount)}
            helperText={Boolean(touched.amount) && errors.amount}
            fullWidth
          />
          <Box height={18} />
          <Field
            name="installment"
            type="number"
            as={TextField}
            color="primary"
            variant="outlined"
            placeholder="Ex. 4700"
            label="Loan Installment (EMI)"
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(errors.installment) && Boolean(touched.installment)}
            helperText={Boolean(touched.installment) && errors.installment}
            fullWidth
          />
          <Box height={18} />
          <Field
            name="phone"
            type="tel"
            as={TextField}
            color="primary"
            variant="outlined"
            placeholder="Ex. 9876543210"
            label="Phone"
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(errors.phone) && Boolean(touched.phone)}
            helperText={Boolean(touched.phone) && errors.phone}
            fullWidth
          />
          <Box height={18} />
          <Field
            name="address"
            type="address"
            as={TextField}
            color="primary"
            variant="outlined"
            placeholder="Ex. Camac Street, WB"
            label="Address"
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(errors.address) && Boolean(touched.address)}
            helperText={Boolean(touched.address) && errors.address}
            fullWidth
          />
          <Box height={18} />

          <Field
            name="fixed"
            type="checkbox"
            as={CustomCheckbox}
            color="primary"
            label="Fixed"
          />
          <Box height={24} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={!isValid || !dirty || isPosting}
          >
            {isPosting ? "Please wait..." : data ? "Update" : "Add"}
          </Button>
          <Box height={24} />
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = createStructuredSelector({
  isPosting: selectLoanPosting,
  postError: selectLoanPostFailure,
  errorMessage: selectLoanErrorMessage,
});

const mapDispatchToProps = (dispatch) => {
  return {
    postData: (data) => dispatch(createLoanApplication({ ...data })),
    updateData: (updatedData, index) =>
      dispatch(updateLoanApplication({ ...updatedData }, index)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoanForm);
