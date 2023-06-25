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
import { deleteUser, getAllUsers, clearErrors } from '../../Actions/userActions';
import { DELETE_USER_RESET } from '../../Constants/userConstant';

const UsersList = () => {
    const dispatch =useDispatch();
    const {error, users}=useSelector((state)=> state.allUsers);
    const alert=useAlert();
    const navigate=useNavigate();
    const {error:deleteError, isDeleted, message}=useSelector((state)=>state.profile);
    const deleteUserHandler=(id)=>{
      dispatch(deleteUser(id));
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
          alert.success(message);
          navigate("/admin/users");
          dispatch({type:DELETE_USER_RESET});
        }
        dispatch(getAllUsers());
    },[dispatch, alert, error, deleteError, isDeleted, navigate,message]);

    const columns = [
        { field: "id", headerName: "Product ID",minWidth: 180,  flex: 0.8 },
        { field: "email", headerName: "Email", minWidth:200, flex: 1 },
        { field: "name", headerName: "Name", minWidth:150,flex: 0.5 },
        { field: "role", headerName: "Role", minWidth:150,flex: 0.3,
        cellClassName: (params)=>{
          return params.value === "admin" ? "greenColor" : "redColor";
      }},
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
                <Link to={`/admin/user/${params.row.id}`}>
                  <EditIcon/>
                </Link>
                <Button onClick={()=>deleteUserHandler(params.row.id)}>
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
      
    const rows=[];
    users && users.forEach((item)=>{
      rows.push({
          id:item._id,
          email:item.email,
          role:item.role,
          name:item.name,
      })
  })
  return (
    <Fragment>
      <MetaData title={`ALL USERS - ADMIN`}/>
      <div className="dashboard">
        <Sidebar/>
        <div style={{overflowX:"auto",}} className="productsListContainer">
            <h1 id='productListHeading'>All Users</h1>
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

export default UsersList
