import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <h2>Home Page</h2>
    <Link to="/checkout">Checkout</Link>
  </div>
);

export default Home;
