import { combineReducers } from "redux";
import users from "./UsersReducer";
import tables from "./TablesReducer";

const appReducer = combineReducers({
    users,
    tables
});

export default appReducer;
