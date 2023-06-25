import React, {Fragment, useEffect } from 'react'
// import {DataGrid} from "@mui/x-data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@material-ui/core';
import MetaData from '../Layout/MetaData';
import LaunchIcon from "@material-ui/icons/Launch";
import { DELETE_ORDER_RESET } from '../../Constants/orderConstant';
import { getAllOrders, clearErrors } from '../../Actions/orderActions';
import Loader from '../Layout/Loader/Loader';
import {DataGrid} from "@mui/x-data-grid";

const MyOrders = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();
    const {loading, error, orders}=useSelector((state)=>state.allOrders);
    const {error:deleteError, isDeleted}=useSelector((state)=>state.order);
    const {user}=useSelector((state)=>state.user);
    
    const columns=[
        {field:"id", headerName: "Order ID", minWidth:250, flex: 1},
        {field:"status", headerName:"Status", minWidth:180, flex: 0.5, 
        cellClassName: (params)=>{
            return params.value === "Delivered" ? "greenColor" : "redColor";
        }},
        {field:"itemsQty", headerName:"Items Qty", type:"number", minWidth:200, flex: 0.3},
        {field:"amount", headerName:"Amount", type:"number", minWidth: 200, flex: 0.5},
        {field:"actions", headerName:"Actions", type:"number", minWidth: 150, flex: 0.3, sortable: false,
        renderCell: (params)=>{
            return (
                <Link to={`/order/${params.row.id}`}>
                    <LaunchIcon />
                </Link>
            );
        }},
    ];
    const rows=[];
    orders && 
    orders.forEach((item, index)=>{
        rows.push({
            itemsQty: item.orderItems.length,
            id:item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        });
    })
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
          alert.success("Order Deleted Successfully");
          navigate("/admin/orders");
          dispatch({type:DELETE_ORDER_RESET});
        }
        dispatch(getAllOrders());
    },[dispatch, alert, error,deleteError, isDeleted, navigate]);
  return (
    <Fragment>
      <MetaData title={`${user.name}'s - Orders`}/>
      {loading ? (
        <Loader/>
      ):(
        <div className="myOrdersPage">
            <DataGrid
                className='myOrdersTable'
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

        </div>
      )
      }
    </Fragment>
  )
}

export default MyOrders
