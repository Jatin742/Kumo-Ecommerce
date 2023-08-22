import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import "./Header.css";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa"
import { useState } from 'react';
import logo from "../../../images/logo.png";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate=useNavigate();

    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
            navigate('/products')
        }
    }
    return (
        <Fragment>
            <div className='header'>
                <div className="logo">
                    <Link to="/"><img src={logo} alt="logo" /></Link>
                </div>
                {/* <div  > */}
                    <form className="search" onSubmit={searchSubmitHandler}>
                        <input type="text" placeholder='Search Here' onChange={(e)=> setKeyword(e.target.value)}/>
                    </form>
                {/* </div> */}
                <div className="icons">
                    <Link to="/wishlist" className='fa'><FaHeart /> </Link>
                    <Link to="/cart" className='fa'><FaShoppingCart /> </Link>
                    <Link to="/account" className='fa'><FaUser /> </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Header