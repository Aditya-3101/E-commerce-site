import React, { useEffect, useLayoutEffect, useState } from "react";
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
  const [platform, setPlatform] = useState(null);
  const [update] = useOutletContext();
  const dispatch = useDispatch();
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

  useLayoutEffect(() => {
    if (window.innerWidth <= 480) {
      setPlatform("Mobile");
    } else {
      setPlatform("Desktop");
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
