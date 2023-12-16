import React, { useEffect, useState, useLayoutEffect } from "react";
import { Card } from "./card";
import { getCards } from "../../api";
import { useLoaderData, useSearchParams, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { hideIt, showIt } from "../../actions";
import { Link } from "react-router-dom";

export function loader({ params }) {
  return getCards();
}

export function Home() {
  const data = useLoaderData();
  const flag = useSelector((state) => state.flag);
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Electrify | Online Shopping web-application";
    dispatch(hideIt());
  }, []);

  function submitSearch(e) {
    e.preventDefault();
    setQuery({ search });
    navigate(`/lists/search?q=${search}`);
  }

  if (data.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="search-container">
        <GiHamburgerMenu
          className="nav-ham"
          onClick={() => dispatch(showIt())}
        />
        {flag === true ? (
          <button onClick={() => dispatch(hideIt())}>X</button>
        ) : null}
        <form onSubmit={submitSearch} className="search-input">
          <input
            type="text"
            className="Home-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for Products, Brands and More"
          />{" "}
          <BiSearch
            className="find-icon"
            onClick={(e) => {
              if (String(search).length !== 0) {
                e.preventDefault();
                setQuery({ search });
                navigate(`/lists/search?q=${search}`);
              }
            }}
          />
        </form>

        <Link to="/account">
          <FaUserCircle className="user-icon" />
        </Link>
      </div>
      <article className="home-card">
        <Card data={data} />
      </article>
    </div>
  );
}
