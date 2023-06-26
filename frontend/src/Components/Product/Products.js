import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../Actions/productActions";
import Loader from '../Layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import Slider from '@material-ui/core/Slider'
import {useAlert} from "react-alert";
import MetaData from '../Layout/MetaData';

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const alert=useAlert();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0, 250000]);
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  }
  const { products, loading, error, productsCount, resultPerPage, productsPerPage, filteredProductsCount } = useSelector(state => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }
  const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones", "Watch"];

  const [category, setCategory] = useState("");
  const [ratings, setRatings]=useState(0);
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings))

  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])

  let count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title="Products -- Kumo"/>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider"
              min={0}
              max={250000}
            />
            <Typography>Categories</Typography>
            <ul className='categoryBox'>
              {
                categories.map((category) => (
                  <li
                    className='category-link'
                    key={category}
                    onClick={() => setCategory(category)}
                  >{category}</li>
                ))
              }
            </ul>

              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRatings)=>{
                    setRatings(newRatings);
                  }}
                  aria-labelledby='continuous-slider'
                  valueLabelDisplay='auto'
                  min={0}
                  max={5}
                  />
              </fieldset>

          </div>

          {((currentPage - 1) * resultPerPage + productsPerPage < count) && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />
            </div>)
          }
        </Fragment>
      }
    </Fragment>
  )
}

export default Products
