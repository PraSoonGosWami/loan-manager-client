import { combineReducers } from "redux";

import adminReducer from "./admin/admin.reducer";
import loanReducer from "./loan/loan.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  admin: adminReducer,
  loan: loanReducer,
  user: userReducer,
});

export default rootReducer;
