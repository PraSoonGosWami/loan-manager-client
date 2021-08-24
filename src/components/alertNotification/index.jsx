import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

const AlertNotification = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        limit={1}
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
};

export default AlertNotification;
