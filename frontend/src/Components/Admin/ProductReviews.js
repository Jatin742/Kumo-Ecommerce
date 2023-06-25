import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import "./ProductReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllReviews, deleteReviews } from "../../Actions/productActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from '@material-ui/core';
import MetaData from "../Layout/MetaData.js";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import Sidebar from "./Sidebar.js";
import { DELETE_REVIEW_RESET } from '../../Constants/productConstants';

const ProductReviews = () => {
    const dispatch = useDispatch();
    const { error: deleteError, isDeleted } = useSelector((state) => state.review);
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, reviews, loading } = useSelector((state) => state.productReviews);
    const [productId, setProductId] = useState("");
    const deleteReviewsHandler = (reviewId) => {
          dispatch(deleteReviews(reviewId, productId));
    }
    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    }
    useEffect(() => {
        if(productId.length===24){
            dispatch(getAllReviews(productId));
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted, navigate,productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
        { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
        { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
        {
            field: "rating", headerName: "Rating", minWidth: 180, flex: 0.4, type: "number",
            cellClassName: (params) => {
                return params.value >= 3 ? "greenColor" : "redColor";
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button onClick={() => deleteReviewsHandler(params.row.id)}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];
    reviews && reviews.forEach((item) => {
        rows.push({
            id: item._id,
            comment: item.comment,
            rating: item.rating,
            user: item.name,
        })
    })
    return (
        <Fragment>
            <MetaData title={`ALL REVIEWS - ADMIN`} />
            <div className="dashboard">
                <Sidebar />
                <div style={{ overflowX: "auto", }} className="productReviewsContainer">
                    <form
                        className='productReviewsForm'
                        encType='multipart/form-data'
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className='productReviewsFormHeading'>All Reviews</h1>
                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder='Product Id'
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)} />
                        </div>

                        <Button
                            id="createProductBtn"
                            type='submit'
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>
                    {
                        reviews && reviews.length > 0 ? (
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className='productListTable'
                                autoHeight
                                style={{overflowY:"auto"}}
                            />
                        ) :
                            (
                                <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                            )
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default ProductReviews
