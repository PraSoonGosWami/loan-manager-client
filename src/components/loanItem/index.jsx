import { useState } from "react";
//material ui
import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
//material icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
//utils
import { getDate } from "../../utils/date-formatter";
//style sheet
import classes from "./styles.module.css";

const LoanItem = ({
  loan,
  id,
  index,
  deleteItem,
  updateItem,
  isAdmin,
  updateLoanStatus,
  row,
}) => {
  const {
    title,
    applicantName,
    email,
    phone,
    address,
    amount,
    installment,
    fixed,
    timestamp,
    verified,
    adminComment,
  } = loan;

  const [comment, setComment] = useState(adminComment || "");

  const reject = () => {
    if (!comment) return;
    updateLoanStatus(id, false, comment, index);
  };

  const approve = () => {
    if (!comment) return;
    updateLoanStatus(id, true, comment, index);
  };

  return (
    <Card elevation={5} className={classes.loanItemContainer}>
      <CardContent className={classes.loanItem}>
        <header
          style={{ justifyContent: isAdmin ? "center" : "space-between" }}
        >
          <Typography variant="h6">{title}</Typography>
          {!isAdmin && (
            <aside>
              {!verified && (
                <IconButton onClick={updateItem}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton onClick={deleteItem}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </aside>
          )}
        </header>
        <main
          style={
            row && {
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }
          }
        >
          <section>
            <Typography>
              <strong>Applicant name:</strong> {applicantName}
            </Typography>
            <Typography>
              <strong> Email:</strong> {email}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {phone}
            </Typography>
            <Typography>
              <strong>Address:</strong> {address}
            </Typography>
          </section>

          <section>
            <Typography>
              <strong>Amount: ₹</strong>
              {parseFloat(amount).toFixed(2)}
            </Typography>
            <Typography>
              <strong>Installment: ₹</strong>
              {parseFloat(installment).toFixed(2)}
            </Typography>

            <Typography>
              <strong>Created on:</strong> {getDate(timestamp)}
            </Typography>
            <Typography>
              <strong>Type: </strong>
              {fixed ? "Fixed" : "Variable"}
            </Typography>
          </section>
        </main>
        <Divider />
        <footer>
          {isAdmin ? (
            <div className={classes.adminActions}>
              <TextField
                type="text"
                multiline
                minRows={4}
                variant="outlined"
                fullWidth
                label="Enter comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <section>
                <Button
                  variant="text"
                  color="primary"
                  disabled={!Boolean(comment)}
                  onClick={reject}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!Boolean(comment)}
                  onClick={approve}
                >
                  Approve
                </Button>
              </section>
            </div>
          ) : (
            <>
              <Typography>
                <strong>Status: </strong>
                {verified ? "Approved" : "Pending"}
              </Typography>
              {adminComment && (
                <Typography>
                  <strong>Comment by Admin: </strong>
                  {adminComment}
                </Typography>
              )}
            </>
          )}
        </footer>
      </CardContent>
    </Card>
  );
};

export default LoanItem;
