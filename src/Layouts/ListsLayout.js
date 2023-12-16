import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
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
  const [platform, setPlatform] = useState("");
  const state = useSelector((state) => state.showFilter);
  const sortState = useSelector((state) => state.showSort);
  const [parameters, setParameters] = useSearchParams();
  let typeFilter = parameters.get("filterBy");
  let sortfilter = parameters.get("sortBy");
  const regex = /\(([^)]+)\)/;
  const cut = regex.exec(typeFilter) || [];
  const range = String(cut[1])?.split("-");
  const data = useLoaderData();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth <= 480) {
      setPlatform("Mobile");
      setIsOpen(false);
    } else {
      setPlatform("Pc");
      setIsOpen(true);
    }
  }, []);

  function handleDisplay() {
    if (platform === "Mobile")
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
        ? data.filter((nom) => Number(nom.Sram) === Number(cut[1]))
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

  let newBrands = new Set(data.map((art) => art.Sbrand));
  let array = Array.from(newBrands);

  return (
    <div className="lists-layout">
      <section className="lists-filter-pc">
        <p onClick={handleDisplay}>{state ? "Filters" : "Filters / Sort"}</p>
        <article className={state ? "show-accordian" : "hide-accordian"}>
          <details className="lists-accordian" open={isOpen}>
            <summary>
              <span>Price</span>
            </summary>
            <div>
              <Link to="?filterBy=price(10000-15000)">10,000-15,000</Link>
              <Link to="?filterBy=price(15000-20000)">15,000-20,000</Link>
              <Link to="?filterBy=price(20000-30000)">20,000-30,000</Link>
              <Link to="?filterBy=price(30000-40000)">30,000-40,000</Link>
              <Link to="?filterBy=price(40000-50000)">40,000-50,000</Link>
            </div>
          </details>
          <details className="lists-accordian" open={isOpen}>
            <summary>
              <span>Brand</span>
            </summary>
            <div>
              {array.map((bar, index) => (
                <Link key={index} to={`?filterBy=brand(${bar})`}>
                  {bar}
                </Link>
              ))}
            </div>
          </details>
          <details className="lists-accordian" open={isOpen}>
            <summary>
              <span>RAM</span>
            </summary>
            <div>
              <Link to="?filterBy=ram(4)">4GB</Link>
              <Link to="?filterBy=ram(8)">8GB</Link>
              <Link to="?filterBy=ram(12)">12GB</Link>
            </div>
          </details>
          <details className="lists-accordian" open={isOpen}>
            <summary>
              <span>Storage</span>
            </summary>
            <div>
              <Link to="?filterBy=storage(64)">64GB</Link>
              <Link to="?filterBy=storage(128)">128GB</Link>
              <Link to="?filterBy=storage(256)">256GB</Link>
              <Link to="?filterBy=storage(512)">512GB</Link>
            </div>
          </details>
          <button
            onClick={() => {
              setParameters("");
            }}
            className={`${
              typeFilter ? "show-clear-filter for-pc" : "hide-clear"
            }`}
          >
            Clear filters
          </button>
          <p>sort By</p>
          <section>
            <Link to="?sortBy=price(low-to-high)">Price: Low to High</Link>
            <Link to="?sortBy=price(high-to-low)">Price: High to Low</Link>
          </section>
          <button
            onClick={() => {
              dispatch(hideSort());
              setParameters("");
            }}
            className={`${
              sortfilter !== null ? "show-clear-filter for-pc" : "hide-clear"
            }`}
          >
            clear-filters
          </button>
          {state ? (
            <button
              onClick={() => {
                dispatch(hideFilter());
              }}
              className={
                platform === "Mobile" ? "show-clear for-pc" : "hide-accordian"
              }
            >
              Hide Filters
            </button>
          ) : null}
        </article>
      </section>
      {typeFilter !== null ? (
        <button
          onClick={() => {
            setParameters("");
          }}
          className={state === false ? "show-clear for-pc" : "hide-accordian"}
        >
          Clear Filters
        </button>
      ) : null}
      <Outlet context={[update]} />
    </div>
  );
};
