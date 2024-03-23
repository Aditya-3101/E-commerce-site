import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideIt } from "../actions";
import { PiShoppingCartSimple } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { CiMobile4 } from "react-icons/ci";
import { BsLaptop, BsQuestionLg } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function SideNav() {
  const visible = useSelector((state) => state.flag);
  const dispatch = useDispatch();

  const SideBar = () => {
    return (
      <div className="nav-body-overlay">
      <ul className={visible ? "vertical-nav show" : "vertical-nav"}>
        <p onClick={() => dispatch(hideIt())}>&#10006;</p>
        <div className="user-area">
          <FaUserCircle className="user-circle" />
          <p>username</p>
        </div>
        <li>
          <CiMobile4 />
          <Link to="/lists/Mobiles">Mobiles</Link>
        </li>
        <li>
          <BsLaptop />
          <Link to="/lists/Laptops"> Laptops</Link>
        </li>
        <li>
          <FaUserCircle />
          <Link to="/account">My Account</Link>
        </li>
        <li>
          <AiOutlineShopping />
          <Link to="/cart">My Carts</Link>
        </li>

        <li>
          <PiShoppingCartSimple />
          <Link to="/orders">My Orders</Link>
        </li>
        <li>
          <BsQuestionLg />
          <p>Faq</p>
        </li>
      </ul></div>
    );
  };

  return <div>{visible ? <SideBar /> : ""}</div>;
}
