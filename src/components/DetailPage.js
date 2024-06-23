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
import { addItem, delItem, userLogout } from "../actions";

export function loader({ params }) {
  if (params.type === "Mobiles") {
    return getMobiles(params.id);
  } else if (params.type === "Laptops") {
    return getLaptops(params.id);
  }
}

export const DetailPage = () => {
  const dataCollection = useLoaderData();
  // const info = Object.assign({}, data[0]);
  const data = dataCollection[0]
  const photos = String(data.SmPhotos).split("|||");
  const { type } = useParams();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState(false);
  const check = useSelector((state) => state.Item);
  const user = useSelector((state) => state.loginUser);
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
    if (data.length === 0) {
      navigate("*");
    }
    checkcart();
  }, []);

  function checkcart() {
    if (check.length !== 0) {
      check.filter((par) => {
        if (par.ProductId === data.ProductId) {
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
    console.log("add to cartt");
    if (user.length !== 0) {
      try {
        dispatch(addItem(data));
      } catch (e) {
        console.log(e);
      } finally {
        setMsg(!msg);
      }
    } else {
      dispatch(addItem(data));
      navigate("/cart");
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
              {data.Sname}
              <span>
                ({data.Scolor},{data.Sram}GB,{data.Sstorage}GB)
              </span>
            </p>
            <p className="high-ratings">
              <FaStar
                className={`${data.S_rating >= 0 ? "filled" : "no-filled"}`}
              />
              {data.S_rating > 1 && data.S_rating <= 1.5 ? (
                <FaStarHalf className="filled" />
              ) : data.S_rating > 1.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              {data.S_rating > 2 && data.S_rating <= 2.5 ? (
                <FaStarHalf className="filled" />
              ) : data.S_rating > 2.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              {data.S_rating > 3 && data.S_rating <= 3.5 ? (
                <FaStarHalf className="filled" />
              ) : data.S_rating > 3.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              {data.S_rating > 4 && data.S_rating <= 4.5 ? (
                <FaStarHalf className="filled" />
              ) : data.S_rating > 4.5 ? (
                <FaStar className="filled" />
              ) : (
                <FaStar className="not-filled" />
              )}
              ({Number(data.S_reviews).toLocaleString("en-IN")} ratings)
            </p>
            <p className="detail-price">
              &#8377;{Number(data.Sprice).toLocaleString("en-IN")}
            </p>
          </article>
          <article className="highlight-data">
            <div>
              <BsFillCameraFill className="data-icon" />
              <p>{data.SpriCamera}</p>
            </div>
            <div>
              <GrStorage className="data-icon" />
              <p>{data.Sstorage}GB</p>
            </div>
            <div>
              <GiProcessor className="data-icon" />
              <p>{data.Sprocessor}</p>
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
              disabled={msg === true ? true : false}
              onClick={() => {
                try {
                  dispatch(addItem(data));
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
                <span>{data.S_model_no}</span>
              </div>
              <div>
                <p>Name</p>
                <span>{data.Sname}</span>
              </div>
              <div>
                <p>Brand</p>
                <span>{data.Sbrand}</span>
              </div>
              <div>
                <p>Operating System</p>
                <span>{data.Sosver}</span>
              </div>
              <div>
                <p>RAM</p>
                <span>{data.Sram}GB</span>
              </div>
              <div>
                <p>Storage</p>
                <span>{data.Sstorage}GB</span>
              </div>
              <div>
                <p>Processor</p>
                <span>{data.Sprocessor}</span>
              </div>
              {data.Product_type === "Mobiles" ? (
                <div>
                  <p>Battery</p>
                  <span>
                    {data.SBattery}mAh {data.SBattery_info}
                  </span>
                </div>
              ) : null}
              <div>
                <p>Screen Size</p>
                <span>
                  {data.S_display_size}inch {data.S_display_type}
                </span>
              </div>
              <div>
                <p>Resolution</p>
                <span>{data.S_display_res}px</span>
              </div>
              <div>
                <p>Primary camera</p>
                <span>
                  {data.Product_type === "Laptops"
                    ? data.SpriCamera
                    : data.SpriCamera_fea}
                </span>
              </div>
              {data.Product_type === "Mobiles" ? (
                <div>
                  <p>Secondary camera</p>
                  <span>
                    {data.SsecCamera} {data.SsecCamera_fea}
                  </span>
                </div>
              ) : null}
              {data.Product_type === "Mobiles" ? (
                <div>
                  <p>Video recording</p>
                  <span>{data.Svideo_rec}</span>
                </div>
              ) : null}
              {data.Product_type === "Laptops" ? (
                <div>
                  <p>Expandable Ram</p>
                  <span>{data.SMram}GB</span>
                </div>
              ) : null}
              {data.Product_type === "Mobiles" ? (
                <div>
                  <p>Network type</p>
                  <span>{data.S_internet_conn}</span>
                </div>
              ) : null}
              {data.Product_type === "Laptops" ? (
                <div>
                  <p>Dedicated Graphic Card</p>
                  <span>{data.Sgraphic}</span>
                </div>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
