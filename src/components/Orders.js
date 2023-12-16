import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export const Orders = () => {
  const user = useSelector((state) => state.loginUser);
  const [orders, setOrders] = useState([]);

  const accDetails = user[0];

  const fetchOrders = async () => {
    const res = await fetch(
      `https://native-api-j7sx.onrender.com/api/main/orders/get/min`,
      {
        method: "POST",
        body: JSON.stringify({
          num: accDetails[0].Pnumber,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw {
        message: res.text,
        code: res.status,
        statusText: res.statusText,
      };
    }
    const data = await res.json();
    setOrders(data);
  };

  const deleteItem = (orderID) => {
    fetch(
      `https://native-api-j7sx.onrender.com/api/main/orders/remove/min?id=${orderID}`
    )
      .then((res) => res.json())
      .then((res) => {
        fetchOrders();
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <div className="empty-cart-container">
        <img
          src="https://i.ibb.co/1ztvRMN/undraw-No-data-re-kwbl.png"
          alt="empty cart"
          className="empty-icon"
        />
        <p>There are no orders &#128533;</p>
      </div>
    );
  }

  return (
    <div>
      <section>
        {orders.map((para, index) => {
          return (
            <section key={index}>
              <Link
                className="order-card"
                to={`/lists/${
                  para.OrderProductType === "Laptops" ? "Laptops" : "Mobiles"
                }/${para.ProductId}`}
              >
                <div>
                  <p className="order-card-name">{para.Sname}</p>
                  <p className="order-card-price">
                    &#8377;{Number(para.Sprice).toLocaleString("en-IN")}
                  </p>
                  <p className="order-card-status">
                    <span></span>
                    {para.ordersStatus}
                  </p>
                  <p>00000{para.orderId}</p>
                </div>
                <img src={para.Simg} alt={para.Sname} />
              </Link>
              <div
                className={`order-section-btns ${
                  para.ordersStatus === "Delivered" ? "hide-section" : ""
                }`}
              >
                <button
                  className="order-cancel-button"
                  onClick={() => deleteItem(para.orderId)}
                >
                  <FaTrash />
                  <span>Cancel</span>
                </button>
                <Link
                  className="order-proceed-button"
                  to={`/lists/${
                    para.OrderProductType === "Laptops" ? "Laptops" : "Mobiles"
                  }/${para.ProductId}`}
                >
                  Proceed
                </Link>
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
};
