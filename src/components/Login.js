import React, { useState } from "react";
import { Link, useNavigate,redirect, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../actions/index";
import {FaUserCircle,FaLock} from "react-icons/fa";


export const Login = () => {
  const [formData, setFormData] = useState({
    pnumber: "9876543210",
    pwd: "Joe@12345",
  });
  const navigation = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function checkUser() {
    let request = await fetch(
      `https://native-json.onrender.com/users?Pnumber=${formData.pnumber}&&userPassword=${formData.pwd}`
      // {
      //   method: "POST",
      //   body: JSON.stringify({
      //     num: formData.pnumber,
      //     pass: formData.pwd,
      //   }),
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // }
    );
    if (!request.ok) {
      throw {
        msg: request.text,
        status: request.status,
        statusText: request.statusText,
      };
    }
    const res = await request.json();
    if (Object(res).length === 1) {
      dispatch(userLogin(res));
      console.log("im here")
      navigation("/")
      console.log("done");
    } else {
      alert("No user found");
    }
  }

  function formSubmit(e) {
    e.preventDefault();
    let pwdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (formData.pnumber.length === 10 && pwdRegex.test(formData.pwd)) {
      checkUser();
    } else {
      alert("Kindly Enter proper information.");
    }
  }

  return (
    <section className="login-section" onSubmit={formSubmit}>
      <h2>Electrify</h2>
      <article>
        <p className="login-heading">Login</p>
        <form className="login-form">
          <p>
            <FaUserCircle/>
            <input
              type="number"
              inputMode="numeric"
              value={formData.pnumber}
              name="pnumber"
              onChange={handleChange}
              placeholder="Enter Your Phone Number"
            />
          </p>
          <p>
            <FaLock/>
            <input
              type="password"
              value={formData.pwd}
              name="pwd"
              onChange={handleChange}
              placeholder="Enter your Password"
            />
          </p>
          <button onClick={formSubmit}>Login</button>
        </form>
        <Link className="signup-suggestion" to="/signin">
          Create an Account
        </Link>
      </article>
    </section>
  );
};
