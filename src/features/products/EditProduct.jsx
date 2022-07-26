import React from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";
import { useFetchProductByIdQuery } from "./productApiSlice";

import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./productStyle/productForm.css";
import axios from "../../app/api/axios";
import { selectCurrentToken } from "../auth/authSlice";
import { setProducts } from "./productSlice";
import Input from "../../components/Input";

const EditProduct = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useFetchProductByIdQuery(id);
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [form, setForm] = useState({});
  const token = useSelector(selectCurrentToken);
  const [isSpecial, setIsSpecial] = useState(data?.productDetails?.isSpecial);
  const [file, setFile] = useState();
  const formData = new FormData();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.append("name", form?.name);
    formData.append("price", form?.price);
    formData.append("description", form?.description);
    if (isSpecial && form?.isSpecial === true) {
      formData.append("isSpecial", true);
      formData.append("daySpecial", form?.daySpecial);
    }
    formData.append("photo", file);
    // Display the keys

    try {
      // const result = await create(formData);

      const { data } = await axios.patch(`/product/${id}`, formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        navigate("/dashboard");
        setForm({});
        setAdd(!add);
      }
    } catch (error) {
      if (!error?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (error.originalStatus === 400) {
        setErrMsg("Missing fields");
      } else if (error.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      setForm({});
      setAdd(!add);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div>
      <div
        key={data?.productDetails?._id}
        style={{
          width: "100%",
          height: "50vh",
          display: "flex",
          background: `url(${data?.productDetails?.photo?.secure_url}), #D9D9D9`,
          borderRadius: "10px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          alignItems: "flex-end",
        }}
      >
        <div
          className=""
          style={{
            display: "flex",
            background: " rgba(22, 20, 41, 0.4)",
            backdropFilter: "blur(2px)",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            color: "white",
          }}
        >
          <h5>{data?.productDetails?.name}</h5>
          <p>{data?.productDetails?.description}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Input
          label={"Dish Name"}
          type="text"
          name="name"
          placeholder="Enter name"
          handleChange={handleChange}
        />
        <Input
          label={"Dish Price"}
          type="number"
          name="price"
          placeholder="Enter price"
          handleChange={handleChange}
        />
        <Input
          label={"Dish Description"}
          type="text"
          name="description"
          placeholder="Enter details"
          handleChange={handleChange}
        />
        {/* <Input
            label={"Dish isSpecial"}
            type="b"
            name="price"
           
            placeholder="Enter price"
            handleChange={handleChange}
          /> */}
        <label htmlFor="isSpecial"> Special Menu</label>

        {isSpecial}
        <select
          name="isSpecial"
          id=""
          onChange={(e) => {
            handleChange(e);
            setIsSpecial(e.target.value);
          }}
        >
          <option value={false}>No</option>
          <option value={true}> Yes</option>
        </select>
        {isSpecial ? (
          <>
            <Input
              label={"  Special"}
              type="text"
              name="daySpecial"
              placeholder="enter day"
              handleChange={handleChange}
            />
          </>
        ) : (
          <></>
        )}
        <Input
          label={" Dish Image"}
          type="file"
          name="file"
          value={file}
          placeholder="select image"
          handleChange={handleFile}
        />

        <button>Create</button>
      </form>
    </div>
  );
};

export default EditProduct;
