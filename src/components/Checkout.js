import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";

export const Checkout = () => {
  const data = useSelector((state) => state.Item);
  const [radio, setRadio] = useState("");

  const total = () => {
    let tot = 0;
    for (let i = 0; i < data.length; i++) {
      tot += Number(data[i].Sprice);
    }
    return tot;
  };
  return (
    <div className="checkout">
      <div className="checkout-header">
        <Link to="..">
          <MdArrowBackIos className="MdBackArrow" />
        </Link>
        <span>Payment</span>
      </div>
      <div className="checkout-total">
        <span>Total</span>
        <span>&#8377;{Number(total()).toLocaleString("en-IN")}</span>
      </div>
      <div className="checkout-payment-type">
        <p>Select Payment Methods</p>
        <label>
          UPI
          <input type="radio" value="UPI" />
        </label>
        <label>
          Cash on delivery
          <input type="radio" />
        </label>
      </div>
      <div className="shipping-details">
        <p>Shipping Details</p>
        <label>
          Address
          <input type="text" />
        </label>
        <label>
          Phone number
          <input type="number" />
        </label>
      </div>
      <div className="order-section">
        <p>My Orders</p>
        {data.map((dat, index) => {
          return (
            <div key={index} className="order-item">
              <img src={dat.Simg} alt={dat.Sname} />
              <div>
                <p>{dat.Sname}</p>
                <p>&#8377;{Number(dat.Sprice).toLocaleString("en-IN")}</p>
                <button>Remove</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="order-btns-section">
        <button
          className="order-btn"
          onClick={() => alert("Your order is placed")}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
