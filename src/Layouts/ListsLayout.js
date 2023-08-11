import React, { useState } from "react";
import { Outlet, Link, useSearchParams, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  displayFilter,
  hideFilter,
  displaySort,
  hideSort,
} from "../actions/index";
import { getMobiles, getLaptops, getResults } from "../api";

export function loader({ params, request }) {
  if (params.type === "Mobiles") {
    return getMobiles();
  } else if (params.type === "Laptops") {
    return getLaptops();
  } else if (params.type === "search") {
    let newUrl = new URL(request.url);
    let newParams = new URLSearchParams(newUrl.search);
    return getResults(newParams.get("q"));
  }
}

export const ListsLayout = () => {
  const [initial, setIntial] = useState("price");
  const state = useSelector((state) => state.showFilter);
  const sortState = useSelector((state) => state.showSort);
  const display = useSelector((state) => state.showFilter);
  const showSort = useSelector((state) => state.showSort);
  const [parameters, setParameters] = useSearchParams();
  let typeFilter = parameters.get("filterBy");
  let sortfilter = parameters.get("sortBy");
  const regex = /\(([^)]+)\)/;
  const cut = regex.exec(typeFilter) || [];
  const range = String(cut[1])?.split("-");
  const data = useLoaderData();
  const dispatch = useDispatch();

  function handleDisplay() {
    state ? dispatch(hideFilter()) : dispatch(displayFilter());
  }

  function handleSort() {
    sortState ? dispatch(hideSort()) : dispatch(displaySort());
  }

  function setFilter(filter) {
    setIntial(filter);
  }

  let update =
    typeFilter != null
      ? typeFilter?.includes("price")
        ? data.filter(
            (nom) =>
              nom.Sprice > Number(range[0]) && nom.Sprice < Number(range[1])
          )
        : typeFilter?.includes("brand")
        ? data.filter((nom) => nom.Sbrand === cut[1])
        : typeFilter?.includes("ram")
        ? data.filter((nom) => nom.Sram === Number(cut[1]))
        : typeFilter?.includes("storage")
        ? data.filter((nom) => nom.Sstorage === cut[1])
        : data
      : sortfilter !== null
      ? sortfilter?.includes("low-to-high")
        ? data.sort((a, b) => {
            return a.Sprice - b.Sprice;
          })
        : sortfilter?.includes("high-to-low")
        ? data.sort((a, b) => {
            return b.Sprice - a.Sprice;
          })
        : data
      : data;

  const filterTypes = () => {
    let newBrands = new Set(data.map((art) => art.Sbrand));
    let array = Array.from(newBrands);

    return (
      <>
        <div className="filter-card">
          {initial === "price" ? (
            <div className="filter-options">
              <Link to="?filterBy=price(10000-15000)">10,000-15,000</Link>
              <Link to="?filterBy=price(15000-20000)">15,000-20,000</Link>
              <Link to="?filterBy=price(20000-30000)">20,000-30,000</Link>
              <Link to="?filterBy=price(30000-40000)">30,000-40,000</Link>
              <Link to="?filterBy=price(40000-50000)">40,000-50,000</Link>
            </div>
          ) : initial === "Brand" ? (
            <div className="filter-options">
              {array.map((bar, index) => (
                <Link key={index} to={`?filterBy=brand(${bar})`}>
                  {bar}
                </Link>
              ))}
            </div>
          ) : initial === "Ram" ? (
            <div className="filter-options">
              <Link to="?filterBy=ram(4)">4GB</Link>
              <Link to="?filterBy=ram(6)">6GB</Link>
              <Link to="?filterBy=ram(8)">8GB</Link>
            </div>
          ) : initial === "Storage" ? (
            <div className="filter-options">
              <Link to="?filterBy=storage(64)">64GB</Link>
              <Link to="?filterBy=storage(128)">128GB</Link>
              <Link to="?filterBy=storage(256)">256GB</Link>
              <Link to="?filterBy=storage(512)">512GB</Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  };

  return (
    <div className="lists-layout">
      <main className="lists-filter">
        <nav className="subnav">
          <button onClick={handleDisplay}>&#061;Filter</button>
          <button onClick={handleSort}>⇅Sort</button>
        </nav>
        <div className="filter-sort">
          <main
            className={`${display ? "filter-container" : "hide-container"}`}
          >
            <div className="filter-list">
              <p onClick={() => setFilter("price")}>Price</p>
              <p onClick={() => setFilter("Brand")}>Brand</p>
              <p onClick={() => setFilter("Ram")}>Ram</p>
              <p onClick={() => setFilter("Storage")}>Storage</p>
            </div>
            <div className="filter-types">{filterTypes()}</div>
          </main>
          <button
            onClick={() => {
              dispatch(hideFilter());
              setParameters("");
            }}
            className={`${typeFilter ? "show-clear-filter" : "hide-clear"}`}
          >
            Clear filters
          </button>
          <main className={`${showSort ? "sort-container" : "hide-sort"}`}>
            <Link to="?sortBy=price(low-to-high)">Price: Low to High</Link>
            <Link to="?sortBy=price(high-to-low)">Price: High to Low</Link>
            <button
              onClick={() => {
                dispatch(hideSort());
                setParameters("");
              }}
              className={`${sortfilter !== null ? "show-clear" : "hide-clear"}`}
            >
              clear-filters
            </button>
          </main>
        </div>
      </main>

      <Outlet context={[update]} />
    </div>
  );
};
