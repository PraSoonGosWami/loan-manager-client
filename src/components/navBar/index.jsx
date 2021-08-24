//redux
import { connect } from "react-redux";
//reslect
import { createStructuredSelector } from "reselect";
//material ui
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
//material icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
//action creators
import { signOutUser } from "../../redux/user/user.actionCreators";
//selectors
import { selectUserData } from "../../redux/user/user.selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = ({ title, history, logout, isAdmin, showBack, userData }) => {
  const classes = useStyles();
  const navigateToAdmin = () => {
    history.push("/admin");
  };
  const navigateBack = () => {
    history.goBack();
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {showBack && (
            <IconButton color="inherit" onClick={navigateBack}>
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {isAdmin && (
            <Tooltip title="Admin">
              <IconButton color="inherit" onClick={navigateToAdmin}>
                <SupervisorAccountIcon />
              </IconButton>
            </Tooltip>
          )}
          {userData?.email && (
            <Tooltip title={`Signed in as ${userData?.email}`}>
              <InfoIcon size="small" />
            </Tooltip>
          )}
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={logout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userData: selectUserData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(signOutUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
