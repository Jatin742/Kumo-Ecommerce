import React, { Fragment, useEffect } from 'react';
import "./Home.css";
import ProductCard from "./ProductCard.js"
import MetaData from '../Layout/MetaData';
import { CgMouse } from "react-icons/cg";
import { getProduct, clearErrors } from "../../Actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from 'react-alert';

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector(state => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {
        loading ? <Loader /> :
          <Fragment>
            <MetaData title="Kumo" />
            <div className="banner">
              <p>Welcome to Kumo</p>
              <h1>Find Amazing Products Below</h1>
              <a href="#container">
                <button>

                  Scroll <CgMouse />
                </button>
              </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
              {
                products && products.map(product => (
                  <ProductCard product={product} key={product._id} />
                ))}
            </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default Home