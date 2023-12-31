import React, {Fragment, useEffect, useState} from 'react';
import "./NewProduct.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, updateProduct, getProductDetails } from '../../Actions/productActions';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../Layout/MetaData';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import Sidebar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../Constants/productConstants';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';

const UpdateProduct = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {loading, error:updateError, isUpdated}=useSelector((state)=>state.product);
    const {error, product}=useSelector((state)=>state.productDetails);

    const navigate=useNavigate();
    const [name, setName]=useState("");
    const [price, setPrice]=useState(0);
    const [description, setDescription]=useState("");
    const [category, setCategory]=useState("");
    const [stock, setStock]=useState(0);
    const [oldImages, setOldImages]=useState([]);
    const [images, setImages]=useState([]);
    const [imagesPreview, setImagesPreview]=useState([]);
    const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones", "Watch"];
    const {id}=useParams();
    
    useEffect(()=>{
        if(product && product._id!==id){
            dispatch(getProductDetails(id));
        }
        else{
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
            
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
            alert.success("Product Updated Successfully")
            navigate("/admin/products")
            dispatch({type:UPDATE_PRODUCT_RESET});
        }
    },[dispatch, alert, error, isUpdated, navigate, product, id, updateError])
    const updateProductSubmitHandler=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set('name',name);
        myForm.set('price',price);
        myForm.set('description',description);
        myForm.set('Stock',stock);
        myForm.set('category',category);
        images.forEach((image)=>{
            myForm.append("images",image);
        });
        dispatch(updateProduct(id,myForm));
    };

    const updateProductImagesChange =(e)=>{
        const files=Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
        files.forEach((file)=>{
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setImagesPreview((old)=>[...old, reader.result]);
                    setImages((old)=>[...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        })
    }
  return (
    <Fragment>{loading ? <Loader/>:
    <Fragment>
      <MetaData title="Update Product"/>
      <div className='dashboard'>
        <Sidebar/>
        <div className="newProductContainer">
            <form
              className='createProductForm'
              encType='multipart/form-data'
              onSubmit={updateProductSubmitHandler}
              >
                <h1>Update Product</h1>
                <div>
                    <SpellcheckIcon/>
                    <input
                     type="text"
                     placeholder='Product Name'
                     required
                     value={name}
                     onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                    <AttachMoneyIcon/>
                    <input
                     type="number"
                     placeholder='Price'
                     required
                     value={price}
                     onChange={(e)=>setPrice(e.target.value)} />
                </div>
                <div>
                    <DescriptionIcon/>
                    <textarea
                     placeholder='Product Description'
                     value={description}
                     onChange={(e)=>setDescription(e.target.value)}
                     cols="30" 
                     rows="1"></textarea>
                </div>
                <div>
                    <AccountTreeIcon/>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option value="">Choose Category</option>
                        {categories.map((cate)=>(
                            <option key={cate} value={cate}>{cate}</option>
                            ))}
                    </select>
                </div>
                <div>
                    <StorageIcon/>
                    <input
                     type="number"
                     placeholder='Stock'
                     required
                     value={stock}
                     onChange={(e)=>setStock(e.target.value)}
                     />
                </div>
                <div id="createProductFormFile">
                    <input
                     type="file"
                     name='avatar'
                     accept='image/*'
                     multiple
                     onChange={updateProductImagesChange}
                     />
                </div>
                <div id="createProductFormImage">
                    { oldImages&& oldImages.map((image,index)=>(
                        <img key={index} src={image.url} alt="Old Product Preview" />
                        ))}
                </div>
                <div id="createProductFormImage">
                    {imagesPreview.map((image,index)=>(
                        <img key={index} src={image} alt="Product Preview" />
                        ))}
                </div>
                <Button
                    id="createProductBtn"
                    type='submit'
                    disabled={loading? true:false}
                    >
                    Update
                </Button>
            </form>
        </div>
      </div>

    </Fragment>
    }
 </Fragment>
  )
}

export default UpdateProduct
