import React from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../app/api/axios";
import { selectCurrentToken } from "../auth/authSlice";
import { useDeleteByIDMutation } from "./productApiSlice";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { addToCart } from "../cart/cartSlice";
import "./productStyle/product.css";
const Product = ({
  _id,
  name,
  photo,
  price,
  isSpecial,
  description,
  edit,
  isAvailable,
}) => {
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const user = JSON.parse(localStorage.getItem("profile"));
  const IsAdmin = user?.role === "Admin" ? true : false;
  const dispatch = useDispatch();
  const product = {
    _id,
    name,
    photo,
    price,
    description,
    isAvailable,
  };
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    // history.push("/cart");
  };
  const handleEdit = (id) => {
    navigate(`/product/${id}`);
  };
  const [deleteByID, { isLoading }] = useDeleteByIDMutation();
  const deleteByIdD = async (id) => {
    const { data } = await axios.delete(`/product/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",

        authorization: `Bearer ${token}`,
      },
    });
    if (data.success === true) {
      navigate("/dashboard");
    }
  };
  const handleRedirect = (id) => {
    navigate(`/product_details/${id}`);
  };
  return (
    <div
      key={product._id}
      className="product"
      style={{ backgroundImage: `url(${product?.photo?.secure_url})` }}
    >
      {isSpecial ? <p className="special"> Special</p> : ""}
      <div className="product__main">
        <h3>{product.name}</h3>

        <div className="details">
          <span className="price"> Price ₹{product.price}</span>
          {isAvailable ? (
            <span style={{ color: "azure" }}>Available</span>
          ) : (
            <span>Currently not available</span>
          )}
        </div>
        {IsAdmin ? (
          <div className="product__options">
            <button onClick={() => handleEdit(_id)}>
              <FiEdit />
            </button>
            <button onClick={() => deleteByIdD(_id)}>
              <MdOutlineDeleteForever />
            </button>
          </div>
        ) : (
          <div className="product__options">
            <button onClick={() => handleAddToCart(product)}>
              <BsFillCartPlusFill />
            </button>
            <button onClick={() => handleRedirect(_id)}>More</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
