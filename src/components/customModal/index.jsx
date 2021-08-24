import React from "react";
//material ui
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Toolbar,
  useMediaQuery,
  Typography,
} from "@material-ui/core";
//material icons
import CloseIcon from "@material-ui/icons/Close";
//constants
import { MAX_MOBILE_WIDTH } from "../../constant";
import LoanForm from "../loanForm";
//Modal tranisition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomModal = ({ showDialog, closeDialog, updatePayload }) => {
  const isMobile = useMediaQuery(`(max-width:${MAX_MOBILE_WIDTH})`);
  const { data, index } = updatePayload;
  return (
    <Dialog
      fullScreen={isMobile}
      open={showDialog}
      onClose={closeDialog}
      TransitionComponent={Transition}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={closeDialog}>
          <CloseIcon />
        </IconButton>
        <Typography>{!data ? "Create" : "Update"} Loan Application</Typography>
      </Toolbar>
      <DialogContent dividers>
        <Box width={"50vw"} maxWidth={500} />
        <LoanForm data={data} index={index} />
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
