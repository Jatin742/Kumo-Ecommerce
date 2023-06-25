import React, {Fragment, useEffect} from 'react'
import {DataGrid} from "@mui/x-data-grid";
import "./ProductList.css";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useAlert} from "react-alert";
import { Button } from '@material-ui/core';
import MetaData from "../Layout/MetaData.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar.js";
import { deleteOrder, getAllOrders, clearErrors } from '../../Actions/orderActions';
import { DELETE_ORDER_RESET } from '../../Constants/orderConstant';

const OrderList = () => {
  const dispatch =useDispatch();
    const {error, orders}=useSelector((state)=> state.allOrders);
    const alert=useAlert();
    const navigate=useNavigate();
    const {error:deleteError, isDeleted}=useSelector((state)=>state.order);
    const deleteOrderHandler=(id)=>{
      dispatch(deleteOrder(id));
    }
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
    },[dispatch, alert, error, deleteError, isDeleted, navigate]);

    const columns = [
      {field:"id", headerName: "Order ID", minWidth:250, flex: 1},
      {field:"status", headerName:"Status", minWidth:180, flex: 0.5, 
      cellClassName: (params)=>{
          return params.value === "Delivered" ? "greenColor" : "redColor";
      }},
      {field:"itemsQty", headerName:"Items Qty", type:"number", minWidth:200, flex: 0.3},
      {field:"amount", headerName:"Amount", type:"number", minWidth: 200, flex: 0.5},
        {
          field: "actions",
          headerName: "Actions",
          type:"number",
          minWidth:200,
          flex: 1,
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/order/${params.row.id}`}>
                  <EditIcon/>
                </Link>
                <Button onClick={()=>deleteOrderHandler(params.row.id)}>
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
      
    const rows=[];
    orders && orders.forEach((item)=>{
        rows.push({
            id:item._id,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
            status:item.orderStatus,
        })
    })
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - ADMIN`}/>
      <div className="dashboard">
        <Sidebar/>
        <div style={{overflowX:"auto",}} className="productsListContainer">
            <h1 id='productListHeading'>All Orders</h1>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='productListTable'
                autoHeight
            />
        </div>
      </div>
    </Fragment>
  )
}

export default OrderList
