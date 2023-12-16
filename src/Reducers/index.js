import { flag } from "./Flag";
import { Item } from "./Additem";
import { showFilter } from "./Showfilters";
import { combineReducers } from "redux";
import { showSort } from "./Hidesort";
import { loginUser } from "./AuthUser";
import { Status } from "./Status";

const allReducers = combineReducers({
  flag: flag,
  Item: Item,
  showFilter: showFilter,
  showSort: showSort,
  loginUser: loginUser,
  Status: Status,
});

export default allReducers;
