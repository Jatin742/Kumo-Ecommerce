import React, { useEffect } from 'react'
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {Doughnut, Line} from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, PointElement,LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../Actions/productActions.js';
import { getAllOrders } from '../../Actions/orderActions.js';
import { getAllUsers } from '../../Actions/userActions.js';

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement,Tooltip, Legend, ArcElement);

const DashBoard = () => {
  const dispatch=useDispatch();
  const { products}=useSelector((state)=>state.products);
  const {orders}=useSelector((state)=>state.allOrders);
  const {users}=useSelector((state)=>state.allUsers);
  let outOfStock=0;
  products &&
    products.forEach((item)=>{
      if(item.Stock===0){
        outOfStock+=1;
      }
    })
  useEffect(()=>{
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  },[dispatch])
  let totalAmount=0;
  orders && orders.forEach((item)=>{
    totalAmount+=item.totalPrice;
  })
  const lineState={
    labels:["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["black"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      }
    ],
  };
  const dougnutState={
    labels:["Out of stock","Instock"],
    datasets:[
      {
        backgroundColor:["#00A684","#6800B4"],
        hoverBackgroundColor:["#4B5000","#35014F"],
        data:[outOfStock,products.length-outOfStock],
      }
    ]
  }
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboardContainer'>
        <Typography component='h1'>Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={dougnutState}/>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
