import React, { useState, useEffect } from "react";
import { getLaptops, getMobiles } from "../api";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { BsFillCameraFill } from "react-icons/bs";
import { GrStorage } from "react-icons/gr";
import { GiProcessor } from "react-icons/gi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, delItem } from "../actions";

export function loader({ params }) {
  if (params.type === "Mobiles") {
    return getMobiles(params.id);
  } else if (params.type === "Laptops") {
    return getLaptops(params.id);
  }
}

export const DetailPage = () => {
  const data = useLoaderData();
  const info = Object.assign({}, data[0]);
  const photos = String(info.SmPhotos).split("|||");
  const { type } = useParams();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState(false);
  const check = useSelector((state) => state.Item);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
    if(data.length===0){
      navigate("*")
    }
    console.log(data.length)
    checkcart();
  }, []);

  function checkcart() {
    if (check.length !== 0) {
      check.filter((par) => {
        if (par.ProductId === info.ProductId) {
          setMsg(true);
          return true;
        } else {
          setMsg(false);
          return false;
        }
      });
    }
  }

  function addtoCart() {
    try {
      dispatch(addItem(info));
    } catch (e) {
      console.log(e);
    } finally {
      setMsg(!msg);
    }
  }

  return (
    <div>
      <Link
        to={type !== undefined ? `/lists/${type}` : "/"}
        className="back-icon"
      >
        <MdOutlineArrowBackIosNew />
        <span>back to {type}</span>
      </Link>
      <div className="detail-container">
        <div className="detail-img-container">
          {photos.map((par, index) => {
            return (
              <div key={index}>
                <img src={par} alt="mobile" />
              </div>
            );
          })}
        </div>
        <div className="detail-info">
          <article className="highlight-info">
            <p className="detail-name">
              {info.Sname}
              <span>
                ({info.Scolor},{info.Sram}GB,{info.Sstorage}GB)
              </span>
            </p>
            <p className="high-ratings">
              <FaStar
                className={`${info.S_rating >= 0 ? "filled" : "no-filled"}`}
              />
              {info.S_rating > 1 && info.S_rating <= 1.5 ? (
                <FaStarHalf className="filled" />
              ) : info.S_rating > 1.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              {info.S_rating > 2 && info.S_rating <= 2.5 ? (
                <FaStarHalf className="filled" />
              ) : info.S_rating > 2.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              {info.S_rating > 3 && info.S_rating <= 3.5 ? (
                <FaStarHalf className="filled" />
              ) : info.S_rating > 3.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              {info.S_rating > 4 && info.S_rating <= 4.5 ? (
                <FaStarHalf className="filled" />
              ) : info.S_rating > 4.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              ({Number(info.S_reviews).toLocaleString("en-IN")} ratings)
            </p>
            <p className="detail-price">
              &#8377;{Number(info.Sprice).toLocaleString("en-IN")}
            </p>
          </article>
          <article className="highlight-data">
            <div>
              <BsFillCameraFill className="data-icon" />
              <p>{info.SpriCamera}</p>
            </div>
            <div>
              <GrStorage className="data-icon" />
              <p>{info.Sstorage}GB</p>
            </div>
            <div>
              <GiProcessor className="data-icon" />
              <p>{info.Sprocessor}</p>
            </div>
          </article>
          <article className="btn-container">
            {msg ? (
              <button>
                <Link to="/cart">Go to cart</Link>
              </button>
            ) : (
              <button onClick={addtoCart} className="add-btn">
                Add to cart
              </button>
            )}
            <button
              className="buy-btn"
              onClick={() => {
                  try {
                    dispatch(addItem(info));
                    navigate("/cart");
                  } catch (e) {
                    console.log(e);
                  } finally {
                    setMsg(!msg);
                  }
              }}
            >
              Buy now
            </button>
          </article>
          <article className="product-info">
            <p className="detail-header">Details</p>
            <div className="product-data">
              <div>
                <p>Model</p>
                <span>{info.S_model_no}</span>
              </div>
              <div>
                <p>Name</p>
                <span>{info.Sname}</span>
              </div>
              <div>
                <p>Brand</p>
                <span>{info.Sbrand}</span>
              </div>
              <div>
                <p>Operating System</p>
                <span>{info.Sosver}</span>
              </div>
              <div>
                <p>RAM</p>
                <span>{info.Sram}GB</span>
              </div>
              <div>
                <p>Storage</p>
                <span>{info.Sstorage}GB</span>
              </div>
              <div>
                <p>Processor</p>
                <span>{info.Sprocessor}</span>
              </div>
              {info.Product_type === "Mobiles" ? (
                <div>
                  <p>Battery</p>
                  <span>
                    {info.SBattery}mAh {info.SBattery_info}
                  </span>
                </div>
              ) : null}
              <div>
                <p>Screen Size</p>
                <span>
                  {info.S_display_size}inch {info.S_display_type}
                </span>
              </div>
              <div>
                <p>Resolution</p>
                <span>{info.S_display_res}px</span>
              </div>
              <div>
                <p>Primary camera</p>
                <span>
                  {info.Product_type === "Laptops"
                    ? info.SpriCamera
                    : info.SpriCamera_fea}
                </span>
              </div>
              {info.Product_type === "Mobiles" ? (
                <div>
                  <p>Secondary camera</p>
                  <span>
                    {info.SsecCamera} {info.SsecCamera_fea}
                  </span>
                </div>
              ) : null}
              {info.Product_type === "Mobiles" ? (
                <div>
                  <p>Video recording</p>
                  <span>{info.Svideo_rec}</span>
                </div>
              ) : null}
              {info.Product_type === "Laptops" ? (
                <div>
                  <p>Expandable Ram</p>
                  <span>{info.SMram}GB</span>
                </div>
              ) : null}
              {info.Product_type === "Mobiles" ? (
                <div>
                  <p>Network type</p>
                  <span>{info.S_internet_conn}</span>
                </div>
              ) : null}
              {info.Product_type === "Laptops" ? (
                <div>
                  <p>Dedicated Graphic Card</p>
                  <span>{info.Sgraphic}</span>
                </div>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
