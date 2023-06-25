import React, {Fragment, useEffect, useState} from 'react';
import "./NewProduct.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getUserDetails, updateUser } from '../../Actions/userActions';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../Constants/userConstant';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Loader from '../Layout/Loader/Loader';

const UpdateUser = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {loading, error, user}=useSelector((state)=>state.userDetails);
    const {loading:updateLoading, error:updateError, isUpdated}=useSelector((state)=>state.profile);

    const navigate=useNavigate();
    const [name, setName]=useState("");
    const [email, setEmail]=useState(0);
    const [role, setRole]=useState("");
    const {id}=useParams();

    useEffect(()=>{
        if(user && user._id!==id){
            dispatch(getUserDetails(id));
        }
        else if(user){
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("User Updated Successfully")
            navigate("/admin/users")
            dispatch({type:UPDATE_USER_RESET});
        }
    },[dispatch, alert, error, isUpdated, updateError,navigate,user,id])
    const updateUserSubmitHandler=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set('name',name);
        myForm.set('email',email);
        myForm.set('role',role);
        dispatch(updateUser(id,myForm));
    };

  return (
    <Fragment>
      <MetaData title="Update User"/>
      <div className='dashboard'>
        <Sidebar/>
        <div className="newProductContainer">
            {loading?<Loader/>
                :            <form
                className='createProductForm'
                encType='multipart/form-data'
                onSubmit={updateUserSubmitHandler}
                >
                  <h1>Update User</h1>
                  <div>
                      <PersonIcon />
                      <input
                       type="text"
                       placeholder='Name'
                       required
                       value={name}
                       onChange={(e)=>setName(e.target.value)} />
                  </div>
                  <div>
                      <MailOutlineIcon/>
                      <input
                       type='email'
                       placeholder='Email'
                       required
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)} />
                  </div>
  
                  <div>
                      <VerifiedUserIcon />
                      <select value={role} onChange={(e)=>setRole(e.target.value)}>
                          <option value="">Choose Role</option>
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                          
                      </select>
                  </div>
  
                  <Button
                      id="createProductBtn"
                      type='submit'
                      disabled={updateLoading? true:false || role===""?true:false}
                  >
                      Update
                  </Button>
              </form>
            }
        </div>
      </div>

    </Fragment>
  )
}


export default UpdateUser
