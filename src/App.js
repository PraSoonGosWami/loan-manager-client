import { lazy, Suspense, useEffect } from "react";
//react router
import { Route, Redirect, Switch } from "react-router-dom";
//material ui
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
//redux
import { connect } from "react-redux";
//reslect
import { createStructuredSelector } from "reselect";
//action creators
import { checkAuthState } from "./redux/user/user.actionCreators";
//selectors
import { selectUserAuthSuccess } from "./redux/user/user.selectors";
import { selectIsAdmin } from "./redux/admin/admin.selectors";
//component
import AlertNotification from "./components/alertNotification";
import Spinner from "./components/spinner";
//push message
import { firebaseMessaging } from "./firebase";
//API
import { userFcmTokenService } from "./api";
//lazy loading pages
const Admin = lazy(() => import("./pages/admin"));
const Auth = lazy(() => import("./pages/auth"));
const Dashboard = lazy(() => import("./pages/dashboard"));

//mui theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#7E57C2",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

function App({ authSuccess, isAdmin, checkAuthState }) {
  //checks if user is already logged in
  //when the app mounts
  useEffect(() => {
    checkAuthState();
  }, []);

  //get fcm token if auth is successful
  useEffect(() => {
    if (authSuccess && firebaseMessaging) checkForNotificationPermission();
  }, [authSuccess]);

  //checks of notifcation permission
  //generates FCM token
  //sends to the backend
  const checkForNotificationPermission = () => {
    Notification.requestPermission()
      .then((success) => firebaseMessaging.getToken())
      .then((token) => userFcmTokenService({ fcmToken: token }))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route
            path="/auth"
            exact
            render={(props) =>
              !authSuccess ? <Auth {...props} /> : <Redirect to="/dashboard" />
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              authSuccess ? <Dashboard {...props} /> : <Redirect to="/auth" />
            }
          />
          <Route
            path="/admin"
            exact
            render={(props) =>
              isAdmin ? <Admin {...props} /> : <Redirect to="/dashboard" />
            }
          />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
      <AlertNotification />
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  authSuccess: selectUserAuthSuccess,
  isAdmin: selectIsAdmin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthState: () => dispatch(checkAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
