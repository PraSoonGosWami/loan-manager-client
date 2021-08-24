import axios from "axios";
import { LOCAL_STORAGE_USER_DATA_KEY, SERVER_URL } from "../constant";

//creating AXIOS instance
const API = axios.create({
  baseURL: `${SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

//adding the auth token to the req header
API.interceptors.request.use((req) => {
  if (localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY)) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY)).token
    }`;
  }
  return req;
});

//user services
export const userAuthService = (userData) => API.post("/user/auth", userData);
export const userVerificationService = (data) => API.post("/user/verify", data);
export const userFcmTokenService = (fcmToken) =>
  API.post("/user/fcm", fcmToken);

//loan services
export const getLoanByUserIdService = () => API.get("/loan/getByUser");
export const createLoanService = (loanData) =>
  API.post("/loan/create", loanData);
export const updateLoanService = (loanData) =>
  API.post("/loan/update", loanData);
export const deleteLoanService = (loanId) =>
  API.delete("/loan/delete", { data: loanId });

export const getLoanForApprovalService = () => API.get("/loan/getForApproval");
export const approveLoanService = (loanData) =>
  API.post("/loan/approve", loanData);

//admin services
export const checkIfAdminService = () => API.get("/admin/check");
export const getAllAdminsService = () => API.get("/admin/get");
export const addAdminService = (email) => API.post("/admin/add", email);
export const deleteAdminService = (email) =>
  API.delete("/admin/delete", { data: email });
