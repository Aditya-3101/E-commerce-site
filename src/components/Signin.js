import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoIosMail,IoMdMan } from "react-icons/io";
import { BsTelephoneFill,BsGenderAmbiguous } from "react-icons/bs";
import { FaMapMarkedAlt,FaLock } from "react-icons/fa";

export const Signin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    gender: "",
    password: "",
  });
  const navigation = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    let formFlag = true;
    let stringTest = /^[A-Za-z\s]*$/;
    let emailTest = new RegExp(/\S+@\S+\.\S+/);
    let phoneTest = /^[0-9]+$/;
    let pwdTest = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (
      String(formData.name).length === 0 ||
      String(formData.email).length === 0 ||
      String(formData.phone).length === 0 ||
      String(formData.address).length === 0 ||
      String(formData.password).length === 0 ||
      String(formData.gender).length === 0
    ) {
      formFlag = false;
      alert("Kindly fill all fields");
    } else {
      if (stringTest.test(formData.name) === false) {
        formFlag = false;
        alert("Enter name Properly");
      }
      if (emailTest.test(formData.email) === false) {
        formFlag = false;
        alert("Enter Email Properly.");
      }
      if (
        String(formData.phone).length !== 10 ||
        phoneTest.test(formData.phone) === false
      ) {
        formFlag = false;
        alert("Enter Phone number Properly");
      }
      if (formData.age <= 1 || phoneTest.test(formData.age) === false) {
        formFlag = false;
        alert("Enter age Properly");
      }
      if (formData.gender === "") {
        formFlag = false;
        alert("Kindly Select Your Gender");
      }
      if (formData.address === "") {
        formFlag = false;
        alert("Kindly Enter your Address");
      }
      if (pwdTest.test(formData.password) === false) {
        formFlag = false;
        alert(
          "Password should be at least 8 characters long and should contain at least one special characters and Capital letters"
        );
      }
      if (formFlag === true) {
        Adduser();
      }
    }
  };

  const Adduser = () => {
    fetch("https://native-json.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        age: formData.age,
        number: formData.phone,
        mail: formData.email,
        psw: formData.password,
        gen: formData.gender,
        add: formData.address,
      }),
    })
      .then((res) => res.json())
      .then((response) => navigation("/login"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signin-sc">
      <p>Sign up</p>
      <div className="signin-form">
        <section className="signin-first-section">
          <p>
            <span><FaUser/></span>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </p>
          <p>
            <span><IoIosMail/></span>
            <input
              type="email"
              name="email"
              placeholder="Enter your E-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </p>
          <p>
            <span><BsTelephoneFill/></span>
            <input
              type="Number"
              inputMode="numeric"
              name="phone"
              value={formData.phone}
              pattern=".{10}"
              placeholder="Enter Your Phone Number"
              title="Field must be 10 characters long"
              onChange={handleChange}
            />
          </p>
          <p>
            <span><IoMdMan/></span>
            <input
              type="number"
              name="age"
              placeholder="Enter your Age"
              value={formData.age}
              onChange={handleChange}
            />
          </p>
          <p>
            <span><BsGenderAmbiguous/></span>
            <select
              name="gender"
              className="select-gen"
              onChange={handleChange}
              value={formData.gender}
            >
              <option value="">Select Your Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </p>
          <p>
            <span><FaMapMarkedAlt/></span>
            <input
              type="text"
              name="address"
              placeholder="Enter Your address"
              value={formData.address}
              onChange={handleChange}
            />
          </p>
          <p>
            <span><FaLock/></span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </p>
          <p className="signin-btns">
            <button onClick={submitForm} className="signin-submit-btn">
              Submit
            </button>{" "}
          </p>
        </section>
        <section className="signin-sec-section">
          <img src="https://i.ibb.co/Y2Cvc0q/undraw-Sign-up-n6im.png" alt="sign up cover"/>
          <Link to="/Login">Already a user?</Link>
        </section>
      </div>
    </div>
  );
};
