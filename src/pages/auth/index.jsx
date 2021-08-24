//redux
import { connect } from "react-redux";
//reslect
import { createStructuredSelector } from "reselect";
//material ui
import { Box, Button, TextField } from "@material-ui/core";
//formik
import { Field, Form, Formik } from "formik";
//yup
import { object, string, number } from "yup";
//selectors
import {
  selectUserAuthStart,
  selectUserOTPSuccess,
  selectUserAuthError,
  selectUserSuccessMessage,
  selectUserErrorMessage,
} from "../../redux/user/user.selectors";
//action creators
import {
  authenticateUser,
  verifyUser,
} from "../../redux/user/user.actionCreators";
//Alert
import Alerts from "../../components/alert/index";
//stylesheet
import classes from "./styles.module.css";
// initial values for the sign in form
const initalValues = {
  email: "",
  otp: "",
};

const Auth = ({
  authStart,
  otpSent,
  authSuccessMessage,
  authErrorMessage,
  authenticateUser,
  verifyUser,
}) => {
  return (
    <div className={classes.auth}>
      <aside></aside>
      <div className={classes.authForm}>
        <Formik
          initialValues={initalValues}
          validationSchema={object({
            email: string()
              .required("Please enter email")
              .email("Invalid email"),
            otp:
              otpSent &&
              number()
                .typeError("Only numbers are allowed")
                .required("Please enter OTP"),
          })}
          onSubmit={(values) => {
            !otpSent
              ? authenticateUser(values.email.toLowerCase().trim())
              : verifyUser(
                  values.email.toLowerCase().trim(),
                  values.otp.toString()
                );
          }}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form>
              {authSuccessMessage && (
                <Alerts type="success" message={authSuccessMessage} />
              )}
              {authErrorMessage && (
                <Alerts type="error" message={authErrorMessage} />
              )}
              {!(authSuccessMessage || authErrorMessage) && (
                <Alerts type="info" message="Enter email to continue" />
              )}
              <Field
                name="email"
                type="email"
                as={TextField}
                variant="outlined"
                color="primary"
                label="Email"
                fullWidth
                autoFocus={!otpSent}
                disabled={otpSent || authStart}
                required
                error={dirty && Boolean(errors.email) && Boolean(touched.email)}
                helperText={dirty && Boolean(touched.email) && errors.email}
              />
              {otpSent && (
                <>
                  <Box height={16} />
                  <Field
                    name="otp"
                    type="tel"
                    pattern="[0-9]*"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="OTP"
                    autoFocus
                    disabled={authStart}
                    fullWidth
                    required
                    error={dirty && Boolean(errors.otp) && Boolean(touched.otp)}
                    helperText={dirty && Boolean(touched.otp) && errors.otp}
                  />
                </>
              )}
              <Box height={28} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={!isValid || !dirty || authStart}
              >
                {authStart
                  ? "Please wait..."
                  : !otpSent
                  ? "Verify Email"
                  : "Verify OTP"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  authStart: selectUserAuthStart,
  otpSent: selectUserOTPSuccess,
  authSuccessMessage: selectUserSuccessMessage,
  authError: selectUserAuthError,
  authErrorMessage: selectUserErrorMessage,
});

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (email) => dispatch(authenticateUser({ email })),
    verifyUser: (email, otp) => dispatch(verifyUser({ email, otp })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
