import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigation } from "react-router-dom";

export const ListCard = (props) => {
  const { Simg, Sname, Sprice, Scolor, S_rating, Sram, Sstorage } = props.info;
  const { type } = useParams();

  let rating = Number(S_rating * 1).toFixed(1);

  return (
    <div>
      <div className="list-item">
        <img src={Simg} alt={Sname} />
        <div>
          <p className="item-name">
            {Sname}
            <span>({Scolor})</span>
          </p>
          <p>
            <FaStar className={`${S_rating >= 0 ? "filled" : "no-filled"}`} />
            {rating > 1 && rating <= 1.5 ? (
              <FaStarHalf className="filled" />
            ) : rating > 1.5 ? (
              <FaStar className="filled" />
            ) : (
              <FaStar className="not-filled" />
            )}
            {rating > 2 && rating <= 2.5 ? (
              <FaStarHalf className="filled" />
            ) : rating > 2.5 ? (
              <FaStar className="filled" />
            ) : (
              <FaStar className="not-filled" />
            )}
            {rating > 3 && rating <= 3.5 ? (
              <FaStarHalf className="filled" />
            ) : S_rating > 3.5 ? (
              <FaStar className="filled" />
            ) : (
              <FaStar className="not-filled" />
            )}
            {rating > 4 && rating <= 4.5 ? (
              <FaStarHalf className="filled" />
            ) : rating > 4.5 ? (
              <FaStar className="filled" />
            ) : (
              <FaStar className="not-filled" />
            )}
            ({rating})
          </p>
          <p>
            {Sram} | {Sstorage}GB
          </p>
          <p className="item-price">
            &#8377;{Number(Sprice).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
};
