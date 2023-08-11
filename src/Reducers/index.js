import { flag } from "./Flag";
import { Item } from "./Additem";
import { showFilter } from "./Showfilters";
import { combineReducers } from "redux";
import { showSort } from "./Hidesort";

const allReducers = combineReducers({
  flag: flag,
  Item: Item,
  showFilter: showFilter,
  showSort: showSort,
});

export default allReducers;
