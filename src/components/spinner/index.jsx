import { CircularProgress } from "@material-ui/core";
const Spinner = ({ position }) => {
  return (
    <div
      style={{
        position: position || "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 99999,
        backgroundClip: "red",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
};

export default Spinner;
