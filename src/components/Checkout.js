import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdArrowBackIos, MdOutlineCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { delItem } from "../actions";

export const Checkout = () => {
  const data = useSelector((state) => state.Item);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [radio, setRadio] = useState("");
  const [form, setForm] = useState({
    address: "",
    phone: "",
  });

  let addressError = "";
  let phoneError = "";
  let paymentError = "";

  const total = () => {
    let tot = 0;
    for (let i = 0; i < data.length; i++) {
      tot += Number(data[i].Sprice);
    }
    return tot;
  };

  const checkthis = () => {
    if (radio.length < 1) {
      paymentError = "Please select Payment type";
      alert(paymentError);
    }

    if (form.address.length < 5) {
      addressError = "Please enter address Properly.";
      alert(addressError);
    }
    if (form.phone.length!== 10) {
      phoneError = "Please enter phone number properly.";
      console.log(form.phone)
      alert(phoneError);
    }
    if (
      addressError.length < 1 &&
      phoneError.length < 1 &&
      paymentError.length < 1
    ) {
      alert("Your order is placed successfully");
    navigate("/")
    }
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
          <input
            type="radio"
            value="UPI"
            checked={radio === "UPI" ? true : false}
            onChange={(e) => {
              e.preventDefault();
              setRadio("");
              setRadio("UPI");
            }}
          />
        </label>
        <label>
          Cash on delivery
          <input
            type="radio"
            value="COD"
            checked={radio === "COD" ? true : false}
            onChange={(e) => {
              e.preventDefault();
              if (radio !== "COD") {
                setRadio("");
                setRadio("COD");
              }
            }}
          />
        </label>
      </div>
      <div className="shipping-details">
        <p>Shipping Details</p>
        <label>
          Address
          <input
            type="text"
            value={form.address}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </label>
        <label>
          Phone No
          <input
            type="number"
            value={form.phone}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
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
                <button
                  onClick={() => {
                    try {
                      dispatch(delItem(dat.ProductId));
                      navigate("/cart");
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  &#9747; Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="order-btns-section">
        <button className="order-btn" onClick={() => checkthis()}>
          Place Order
        </button>
      </div>
    </div>
  );
};
