import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";

export function Card(props) {
  const [data, setData] = useState(props.data ? props.data : "");
  const [set, unset] = useState(0);

  const categories = [
    {
      name: "Mobiles",
      img: "https://m.media-amazon.com/images/I/81WcjrSQGBL._SL1500_.jpg",
    },
    {
      name: "Laptops",
      img: "https://i.ibb.co/94KHFwV/na-thin-and-light-laptop-hp-original-imag69rnjkctnzhy.jpg",
    },
  ];

  const poster = data.map((para, index) => {
    return (
      <Link
        key={index}
        className={`card-poster`}
        to={`/lists/Mobiles/${para.ProductId}`}
      >
        <div
          className="hero-img-container">
          <img
            src={para.Simg}
            alt={para.Sname}
            className="hero-single-img"
           
          />
          <div
            style={{
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <p className="hero-item-name" style={{ fontFamily: "sans-serif", fontSize: "2.4rem" }}>
              {para.Sname}
            </p>
            <p className="hero-item-star" style={{ fontSize: "2rem" }}>
              <FaStar
                className={`${para.S_rating >= 0 ? "filled" : "no-filled"}`}
              />
              {para.S_rating > 1 && para.S_rating <= 1.5 ? (
                <FaStarHalf className="filled" />
              ) : para.S_rating > 1.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              {para.S_rating > 2 && para.S_rating <= 2.5 ? (
                <FaStarHalf className="filled" />
              ) : para.S_rating > 2.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              {para.S_rating > 3 && para.S_rating <= 3.5 ? (
                <FaStarHalf className="filled" />
              ) : para.S_rating > 3.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              {para.S_rating > 4 && para.S_rating <= 4.5 ? (
                <FaStarHalf className="filled" />
              ) : para.S_rating > 4.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              ({para.S_rating})
            </p>
            <p className="hero-item-specs" style={{ fontFamily: "sans-serif", fontSize: "1.8rem" }}>
              {para.Sram}GB | {para.Sstorage}GB{" "}
            </p>
            <p></p>
            <p className="hero-item-price" style={{ fontFamily: "sans-serif", fontSize: "1.7rem" }}>
              &#8377;{Number(para.Sprice).toLocaleString("en-IN")}
            </p>{" "}
          </div>
        </div>
      </Link>
    );
  });
  const types = categories.map((para, index) => {
    return (
      <div key={index}>
        <Link className="type-des" to={`/lists/${para.name}`}>
          <img
            src={para.img}
            alt={para.name}
            className={para.name === "Laptops" ? "type-lp-img" : "type-img"}
          />
          <p>{para.name}</p>
        </Link>
      </div>
    );
  });
  return (
    <article>
      <div
        className="poster-container hideScroll"
        style={{
          position: "sticky",
          width: "100%",
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "100%",
          scrollbarWidth: "none",
          overflowX: "scroll",
          flexWrap: "nowrap",
        }}
      >
        {poster}
      </div>
      <div>
        <p className="types">Categories</p><div className="type-container">{types}</div>
      </div>
      <div>
        <Link to="/lists/Laptops/10004" className="laptop-card">
          <img src="https://m.media-amazon.com/images/I/61s7sJEpsVL._SL1000_.jpg" />
          <div>
            <p className="item-laptop-name">Lenovo Ideapad</p>
            <p className="item-laptop-process">intel celeron dual core</p>
            <p className="item-laptop-specs">4GB | 256GB</p>
            <p className="item-laptop-price">&#8377; 22,900/- only</p>
          </div>
        </Link>
        <Link to="/lists/Laptops/10001" className="laptop-card-rev">
          <img src="https://i.ibb.co/94KHFwV/na-thin-and-light-laptop-hp-original-imag69rnjkctnzhy.jpg" />
          <div>
            <p className="item-laptop-name">Hp Pavilion 1440</p>
            <p className="item-laptop-process">Intel Core i5 10th Gen</p>
            <p className="item-laptop-specs">8GB | 1TB</p>
            <p className="item-laptop-price">&#8377; 49,600/- only</p>
          </div>
        </Link>
        <Link to="/lists/Mobiles/1003" className="sm-card">
          <img src="https://i.ibb.co/4N7P0pJ/original-imagdm4pzduvcfx4-min-removebg-preview.png" className="sm-card-img" />
          <div>
            <p className="item-laptop-name sm-item">Oneplus Nord CE</p>
            <p className="item-laptop-process sm-item">Snapdragon 750G</p>
            <p className="item-laptop-specs sm-item">6GB | 128GB</p>
            <p className="item-laptop-price sm-item">&#8377; 22,999/- only</p>
          </div>
        </Link>
        <Link to="/lists/Mobiles/1011" className="sm-card sm-card-rev">
          <img src="https://i.ibb.co/HChjD7s/711-JE-d-D1-KL-SX679-removebg-preview.png" className="sm-card-img sm-rev" />
          <div>
            <p className="item-laptop-name sm-item">Apple iPhone 14</p>
            <p className="item-laptop-process sm-item">A15 bionic chip</p>
            <p className="item-laptop-specs sm-item">128GB</p>
            <p className="item-laptop-price sm-item">&#8377; 74,499/- only</p>
          </div>
        </Link>

      </div>
    </article>
  );
}
