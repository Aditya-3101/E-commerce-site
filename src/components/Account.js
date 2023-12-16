import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideIt } from "../actions";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PiShoppingCartSimple } from "react-icons/pi";
import { AiOutlineShopping } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { MdArrowBackIosNew } from "react-icons/md";
import { userLogout } from "../actions/index";

export const Account = () => {
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.flag);
  const user = useSelector((state) => state.loginUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (flag === true) {
      dispatch(hideIt());
    }
  }, []);

  const accDetails = user[0];

  const Logout = () => {
    dispatch(userLogout(accDetails[0].userID));
    navigate("/");
  };

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
            <p>{accDetails[0].userName}</p>
            <p>{accDetails[0].Pnumber}</p>
            <p>{accDetails[0].Mail}</p>
          </div>
        </div>
        <div className="account-options">
          <Link to="/orders">
            <PiShoppingCartSimple className="order-icon" />
            My Orders
          </Link>
          <Link to="/cart">
            <AiOutlineShopping className="acc-cart-icon" />
            My Cart
          </Link>
          <Link onClick={Logout}>
            <CiLogout className="logout-icon" />
            Logout
          </Link>
        </div>
      </article>
    </div>
  );
};
