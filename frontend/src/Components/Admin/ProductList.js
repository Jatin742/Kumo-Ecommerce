import React, {Fragment, useEffect} from 'react'
import {DataGrid} from "@mui/x-data-grid";
import "./ProductList.css";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, getAdminProducts, deleteProduct} from "../../Actions/productActions";
import {Link, useNavigate} from "react-router-dom";
import {useAlert} from "react-alert";
import { Button } from '@material-ui/core';
import MetaData from "../Layout/MetaData.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar.js";
import { DELETE_PRODUCT_RESET } from '../../Constants/productConstants';

const ProductList = () => {
    const dispatch =useDispatch();
    const {error, products}=useSelector((state)=> state.products);
    const alert=useAlert();
    const navigate=useNavigate();
    const {error:deleteError, isDeleted}=useSelector((state)=>state.product);
    const deleteProductHandler=(id)=>{
      dispatch(deleteProduct(id));
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
          alert.success("Product Deleted Successfully");
          navigate("/admin/products");
          dispatch({type:DELETE_PRODUCT_RESET});
        }
        dispatch(getAdminProducts());
    },[dispatch, alert, error, deleteError, isDeleted, navigate]);

    const columns = [
      { field: "id", headerName: "Product ID",minWidth: 200,  flex: 0.5 },
      { field: "name", headerName: "Name", minWidth:350, flex: 1 },
      { field: "stock", headerName: "Stock", minWidth:150,flex: 0.3, type: "number" },
      { field: "price", headerName: "Price", minWidth:270,flex: 0.5, type: "number" },
      {
        field: "actions",
        headerName: "Actions",
        type:"number",
        minWidth: 150,
        flex: 0.3,
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/product/${params.row.id}`}>
                  <EditIcon/>
                </Link>
                <Button onClick={()=>deleteProductHandler(params.row.id)}>
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
      
    const rows=[];
    products && products.forEach((item)=>{
        rows.push({
            id:item._id,
            stock:item.Stock,
            price:item.price,
            name:item.name,
        })
    })
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - ADMIN`}/>
      <div className="dashboard">
        <Sidebar/>
        <div style={{overflowX:"auto",}} className="productsListContainer">
            <h1 id='productListHeading'>All Products</h1>
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

export default ProductList
