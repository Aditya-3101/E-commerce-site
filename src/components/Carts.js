import React from "react";
import { useSelector } from "react-redux";
import { ListCard } from "./ListCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { delItem } from "../actions";

export const Cart = () => {
  const data = useSelector((state) => state.Item);

  const dispatch = useDispatch();

  if (data.length === 0) {
    return (
      <div className="empty-cart-container">
        <img
          src="https://i.ibb.co/1ztvRMN/undraw-No-data-re-kwbl.png"
          alt="empty cart"
          className="empty-icon"
        />
        <p>Cart is Empty &#128533;</p>
      </div>
    );
  }

  return (
    <div>
      {data.map((par, index) => {
        return (
          <div key={index} className="cart-card">
            <Link to={`/lists/${par.Product_type}/${par.ProductId}`}>
              <ListCard info={par} />
            </Link>
            <div className="cart-btns">
              <button onClick={() => dispatch(delItem(par.ProductId))}>
                &#10008; Cancel
              </button>
              <Link to="/checkout">&#10148; Proceed</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
