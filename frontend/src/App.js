import React, { useState, useEffect } from 'react';
import Footer from './Components/Layout/Footer/Footer';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Layout/Header/Header'
import Home from './Components/Home/Home';
import "./App.css"
import WebFont from "webfontloader";
import ProductDetails from "./Components/Product/ProductDetails.js"
import Products from './Components/Product/Products';
import LoginSignUp from './Components/User/LoginSignUp';
import store from "./store";
import { loadUser } from './Actions/userActions';
import UserOptions from "./Components/Layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./Components/User/Profile.js";
import UpdateProfile from './Components/User/UpdateProfile.js';
import UpdatePassword from "./Components/User/UpdatePassword.js";
import ForgotPassword from "./Components/User/ForgotPassword.js";
import ResetPassword from "./Components/User/ResetPassword.js";
import Cart from "./Components/Cart/Cart.js";
import Shipping from "./Components/Cart/Shipping.js";
import ConfirmOrder from "./Components/Cart/ConfirmOrder.js";
import OrderSuccess from "./Components/Cart/OrderSuccess.js";
import MyOrders from "./Components/Order/MyOrders.js";
import axios from 'axios';
import Payment from "./Components/Cart/Payment.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './Components/Route/ProtectedRoute.js';
import OrderDetails from './Components/Order/OrderDetails.js';
import DashBoard from "./Components/Admin/DashBoard.js";
import ProductList from "./Components/Admin/ProductList.js";
import NewProduct from './Components/Admin/NewProduct.js';
import UpdateProduct from './Components/Admin/UpdateProduct.js';
import OrderList from './Components/Admin/OrderList';
import ProcessOrder from './Components/Admin/ProcessOrder';
import UsersList from './Components/Admin/UsersList';
import UpdateUser from './Components/Admin/UpdateUser';
import ProductReviews from './Components/Admin/ProductReviews';

function App() {
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`/api/v1/stripeapikey`);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {

    }
  }
  
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Drold Sans", "Chilanka"]
      }
    });
    try {
      store.dispatch(loadUser());
    } catch (error) {
    }
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/products/:keyword' element={<Products />} />
        <Route exact path='/login' element={<LoginSignUp />} />
        <Route exact path="/account" element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={Profile}/> } />
        <Route exact path="/me/update" element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={UpdateProfile}/>} />
        <Route exact path="/password/update" element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={UpdatePassword}/>} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={Shipping}/>} />
        <Route exact path="/order/confirm" element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={ConfirmOrder}/>} />
        {stripeApiKey!=="" &&<Route exact path='/process/payment' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
            <Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements></ProtectedRoute>}/>}
        <Route exact path='/success' element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={OrderSuccess}/>}/>
        <Route exact path='/orders' element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={MyOrders}/>}/>
        <Route exact path='/order/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={OrderDetails}/>}/>
        <Route exact path='/admin/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} Component={DashBoard}/>}/>
        <Route exact path='/admin/products' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} Component={ProductList}/>}/>
        <Route exact path='/admin/product' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} Component={NewProduct}/>}/>
        <Route exact path='/admin/product/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} Component={UpdateProduct}/>}/>
        <Route exact path='/admin/orders' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} Component={OrderList}/>}/>
        <Route exact path='/admin/order/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} Component={ProcessOrder}/>}/>
        <Route exact path='/admin/users' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} Component={UsersList}/>}/>
        <Route exact path='/admin/user/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} Component={UpdateUser}/>}/>
        <Route exact path='/admin/reviews' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} Component={ProductReviews}/>}/>
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
