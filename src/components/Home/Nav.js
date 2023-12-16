import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsMinecart } from "react-icons/bs";
import { Link } from "react-router-dom";

const NavBar = () => {
  const data = useSelector((state) => state.Item);

  return (
    <>
      <nav className="nav-list">
        <ul>
          <Link to="/">Home</Link>
          <Link to="/lists/Mobiles">Mobiles</Link>
          <Link to="/lists/Laptops">Laptops</Link>
          <Link to="/account">Account</Link>
          <Link to="/orders">Orders</Link>
        </ul>
      </nav>
      <Link to="/cart" className="nav-cart-icon">
        <span>{data.length}</span>
        <BsMinecart className="cart-icon" />
      </Link>
    </>
  );
};

export default NavBar;
