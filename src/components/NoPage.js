import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="no-page">
      <p>Error 404</p>
      <p>Page not found! &#128531;</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};
export default NoPage;
