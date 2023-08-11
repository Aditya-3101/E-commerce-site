import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideIt } from "../actions";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PiShoppingCartSimple } from "react-icons/pi";
import { AiOutlineShopping } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { MdArrowBackIosNew } from "react-icons/md";

export const Account = () => {
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.flag);

  useEffect(() => {
    if (flag === true) {
      dispatch(hideIt());
    }
  }, []);
  return (
    <div>
      <article>
        <div className="back-arrow">
          <Link to="/">
            <MdArrowBackIosNew />
          </Link>
        </div>
        <div className="account-header">
          <div className="account-user-image">
            <FaUserCircle className="account-user-circle" />
          </div>
          <div className="account-details">
            <p>username</p>
            <p>9891989198</p>
            <p>abc@gmail.com</p>
          </div>
        </div>
        <div className="account-options">
          <Link to="/cart">
            <PiShoppingCartSimple className="order-icon" />
            My Orders
          </Link>
          <Link to="/cart">
            <AiOutlineShopping className="acc-cart-icon" />
            My Cart
          </Link>
          <Link>
            <CiLogout className="logout-icon" />
            Logout
          </Link>
        </div>
      </article>
    </div>
  );
};
