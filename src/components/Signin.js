import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <p>Sign in</p>
      <div className="signin-form">
        <section className="signin-first-section">
          <p>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </p>
          <p>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </p>
          <p>
            <span>Phone Number</span>
            <input
              type="Number"
              inputMode="numeric"
              name="phone"
              value={formData.phone}
              pattern=".{10}"
              title="Field must be 10 characters long"
              onChange={handleChange}
            />
          </p>
          <p>
            <span>age</span>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </p>
          <p>
            <span>Gender</span>
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
        </section>
        <section className="signin-sec-section">
          <p>
            <span>Address</span>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </p>
          <p>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </p>
          <p className="signin-btns">
            <button onClick={submitForm} className="signin-submit-btn">
              Submit
            </button>{" "}
            <Link to="/login">Login</Link>
          </p>
        </section>
      </div>
    </div>
  );
};
