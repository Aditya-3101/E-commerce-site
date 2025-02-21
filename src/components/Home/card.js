import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export function Card(props) {
  const [data, setData] = useState(props.data ? props.data : "");
  const reference = useRef();
  const [width, setWidth] = useState(window.screen.availWidth);
  const [displaynavigation, setDisplayNavigation] = useState({
    back: true,
    forward: true,
  });

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

  const banners = [
    {
      name: "apple",
      photo:
        "https://i.imgur.com/XHh7z4S.png",
      desc: "Buy Iphones at nearly 15% Discount ",
    },
  ];

  const cardData = [
    {
      id: 10004,
      name: "Lenovo Ideapad",
      processor: "intel celeron dual core",
      specs: "4GB | 256GB",
      image: "https://i.ibb.co/L5Q0M2x/61s7s-JEps-VL-SL1000.jpg",
      type: "laptop",
      category: "Laptops",
      price: 22900,
    },
    {
      id: 10001,
      name: "Hp Pavilion 1440",
      processor: "intel Core i5 10th Gen",
      specs: "8GB | 1TB",
      image:
        "https://i.imgur.com/fmjpwN0.png",
      type: "laptop",
      category: "Laptops",
      price: 49600,
    },
    {
      id: 1003,
      name: "Oneplus Nord CE",
      processor: "Snapdragon 750G",
      specs: "6GB | 128GB",
      image:
        "https://i.imgur.com/sKEDnvY.png",
      type: "mobile",
      category: "Mobiles",
      price: 22999,
    },
    {
      id: 1011,
      name: "Apple iPhone 14",
      processor: "A15 bionic chip",
      specs: "128GB",
      image: "https://i.ibb.co/x5CmDyX/261991-hhfa33-removebg-preview.png",
      type: "mobile",
      category: "Mobiles",
      price: 74499,
    },
  ];



  useEffect(() => {
    const heroWidth = window.innerWidth * data.length;
    reference.current.scrollTo(width, 0);
  
    // console.log("Scroll Left:", reference.current.scrollLeft); // Check scroll position
  
    const isAtStart = reference.current.scrollLeft === 0;
    const isAtEnd = reference.current.scrollLeft + window.innerWidth + 1 >= heroWidth;
    // console.log("At Start:", isAtStart, "At End:", isAtEnd); // Check conditions
  
    setDisplayNavigation({
      back: !isAtStart,
      forward: !isAtEnd
    });
  
    // console.log("Display Navigation:", displaynavigation); // Check state after update
  }, [data, width]);
  
  
  

  const poster = data.map((para, index) => {
    return (
      <Link
        key={index}
        className={`card-poster ${
          String(para.Sname).search("Apple") > -1 ? "firstPhone" : ""
        }`}
        to={`/lists/Mobiles/${para.ProductId}`}
      >
        <div
          className="hero-img-container"
          style={{
            width: "100% !important",
            height: "auto !important",
            borderRadius: "5px",
            padding: "1rem",
            position: "relative",
            display: "grid",
            gridTemplateColumns: "35% 65%",
          }}
        >
          <img src={para.Simg} alt={para.Sname} className="hero-single-img" />
          <div
            className="hero-card-data"
            style={{
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <p
              className="hero-item-name"
              style={{ fontFamily: "sans-serif", fontSize: "2.4rem" }}
            >
              {para.Sname}
            </p>
            {/* <p className="hero-item-star" style={{ fontSize: "2rem" }}>
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
            </p> */}
            <p
              className="hero-item-specs"
              style={{ fontFamily: "sans-serif", fontSize: "1.6rem" }}
            >
              {para.min_info}
            </p>
            <p className="mini-specs">{para.Sram}GB | {para.Sstorage}GB</p>
            <Link
              className="hero-item-price"
              to={`/lists/Mobiles/${para.ProductId}`}
            >
              Buy Now
            </Link>{" "}
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
        style={{
          position: "relative",
        }}
      >
        <div
          className="poster-container hideScroll"
          style={{
            position: "sticky",
            width: "100%",
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "100%",
            gridAutoRows: "1fr",
            scrollbarWidth: "none",
            overflowX: "scroll",
            flexWrap: "nowrap",
            gridTemplateAreas: "poster",
            scrollSnapType: "x mandatory",
          }}
          ref={reference}
        >
          {poster}
        </div>
        <p
          className={
            displaynavigation.back === true ? "backNavigate" : "hideBack"
          }
          onClick={(e) => {
            e.preventDefault();
            setWidth((prev) => prev - window.screen.availWidth);
          }}
        >
          <MdOutlineArrowBackIosNew />
        </p>
        <p
          className={
            displaynavigation.forward === true ? "forwardNavigate" : "hideBack"
          }
          onClick={(e) => {
            e.preventDefault();
            setWidth((prev) => prev + window.screen.availWidth);
          }}
        >
          <MdOutlineArrowForwardIos />
        </p>
      </div>
      <div>
        <p className="types">Categories</p>
        <div className="type-banners">
          <div className="type-container">{types}</div>
          <section className="banner-container">
            {banners.map((par, index) => {
              return (
                <Link
                  key={index}
                  className="banner"
                  to="/lists/Mobiles?filterBy=brand(Apple)"
                >
                  <div>
                    <p>{par.desc}</p>
                  </div>
                  <img src={par.photo} alt={par.name} />
                </Link>
              );
            })}
          </section>
        </div>
      </div>
      <div>
        {cardData.map((para, index) => {
          return (
            <Link
              to={`/lists/${para.category}/${para.id}`}
              key={index}
              className={
                para.type === "laptop"
                  ? index % 2 === 0
                    ? "laptop-card"
                    : "laptop-card-rev"
                  : index % 2 === 0
                  ? "sm-card"
                  : "sm-card sm-card-rev"
              }
            >
              <img
                src={para.image}
                alt="lenovo"
                className={
                  para.type === "mobile"
                    ? index % 2 === 0
                      ? "sm-card-img"
                      : "sm-card-img sm-rev"
                    : null
                }
              />
              <div>
                <p
                  className={
                    para.type === "laptop"
                      ? "item-laptop-name"
                      : "item-laptop-name sm-item"
                  }
                >
                  {para.name}
                </p>
                <p
                  className={
                    para.type === "laptop"
                      ? "item-laptop-process"
                      : "item-laptop-process sm-item"
                  }
                >
                  {para.processor}
                </p>
                <p className="item-laptop-specs">{para.specs}</p>
                <p className="item-laptop-price">
                  &#8377;{Number(para.price).toLocaleString("en-IN")} only
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </article>
  );
}
