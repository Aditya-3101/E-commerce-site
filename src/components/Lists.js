import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { useSearchParams, useParams } from "react-router-dom";
import { ListCard } from "./ListCard";
import { useDispatch, useSelector } from "react-redux";
import {
  hideFilter,
  hideSort,
  hideIt,
  showIt,
  displayFilter,
  displaySort,
} from "../actions";

export const Lists = () => {
  const [update] = useOutletContext();
  const dispatch = useDispatch();
  const [initial, setIntial] = useState("price");
  const display = useSelector((state) => state.showFilter);
  const showSort = useSelector((state) => state.showSort);
  const [parameters, setParameters] = useSearchParams();
  let typeFilter = parameters.get("filterBy");
  let sortfilter = parameters.get("sortBy");
  const regex = /\(([^)]+)\)/;
  const cut = regex.exec(typeFilter) || [];
  const range = String(cut[1])?.split("-");
  const flag = useSelector((state) => state.flag);

  useEffect(() => {
    if (window.innerWidth <= 480) {
      if (flag === true) {
        dispatch(hideIt());
      }
      dispatch(hideSort());
      dispatch(hideFilter());
    } else {
      dispatch(displayFilter());
      dispatch(displaySort());
    }
  }, []);

  if (update.length === 0) {
    return (
      <div className="no-item">
        <h2>No item found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="lists-main">
      <main className="list-container">
        {update.map((par, index) => {
          return (
            <Link
              to={`/lists/${par.Product_type}/${par.ProductId}`}
              key={index}
            >
              <ListCard info={par} />
            </Link>
          );
        })}
      </main>
    </div>
  );
};
