import React, { Fragment } from 'react'
import "./Cart.css";
import CartItemCard from './CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../Actions/cartActions';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        if (stock <= quantity) {
            return;
        }
        const newQty = quantity + 1;
        dispatch(addItemsToCart(id, newQty));
    }
    const decreaseQuantity = (id, quantity) => {
        if (quantity <= 1) {
            return;
        }
        const newQty = quantity - 1;
        dispatch(addItemsToCart(id, newQty));
    }
    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    }
    const checkOutHandler= ()=>{
        navigate("/login?redirect=shipping");
    }
    return (
        <Fragment>
            {
                cartItems.length === 0 ?
                    <div className="emptyCart">
                        <RemoveShoppingCartIcon />

                        <Typography>No Product in Your Cart</Typography>
                        <Link to="/products">View Products</Link>
                    </div>
                    :
                    <Fragment>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>
                            {cartItems && cartItems.map((item) => (
                                <div className="cartContainer" key={item.product}>
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    <div className="cartInput">
                                        <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                    </div>
                                    <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                                </div>
                            ))
                            }
                            <div className="cartGrossTotal">
                                <div></div>
                                <div className="cartGrossTotalBox">
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce((acc, item) => acc + item.price * item.quantity,
                                        0)}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button onClick={checkOutHandler}>Check Out</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default Cart
