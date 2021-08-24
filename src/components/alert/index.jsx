import Alert from "@material-ui/lab/Alert";

const Alerts = ({ type, message, marginBottom }) => {
  return (
    <div style={{ marginBottom: marginBottom || 32 }}>
      <Alert severity={type}>{message}</Alert>
    </div>
  );
};

export default Alerts;
