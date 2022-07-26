import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import { setCredentials } from "./";
import { useCreateMutation } from "./productApiSlice";
import Input from "../../components/Input";
import "./productStyle/productForm.css";
import axios from "../../app/api/axios";
import { selectCurrentToken } from "../auth/authSlice";
import { setProducts } from "./productSlice";
const initial = {
  name: "",
  price: 0,
  description: "",
  daySpecial: "",
  isSpecial: false,
};
export const CreateProduct = ({ setAdd, add }) => {
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [form, setForm] = useState(initial);
  const token = useSelector(selectCurrentToken);
  const [isSpecial, setIsSpecial] = useState(form.isSpecial);
  const [file, setFile] = useState();
  const formData = new FormData();
  const navigate = useNavigate();
  const [create, { isLoading }] = useCreateMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form, isSpecial);
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

      const { data } = await axios.post("/product/create", formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(setProducts(data));
      setForm(initial);
      setAdd(!add);
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

      setForm(initial);
      setAdd(!add);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const content = false ? (
    <h1>Loading...</h1>
  ) : (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1> Add Dish details</h1>
      {/* name, price, description, isAvailable, isSpecial, daySpecial */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Input
          label={"Dish Name"}
          type="text"
          name="name"
          required
          placeholder="Enter name"
          handleChange={handleChange}
        />
        <Input
          label={"Dish Price"}
          type="number"
          name="price"
          required
          placeholder="Enter price"
          handleChange={handleChange}
        />
        <Input
          label={"Dish Description"}
          type="text"
          name="description"
          required
          placeholder="Enter details"
          handleChange={handleChange}
        />
        {/* <Input
            label={"Dish isSpecial"}
            type="b"
            name="price"
            required
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
              label={" day when Special"}
              type="text"
              name="daySpecial"
              required
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
          required
          placeholder="select image"
          handleChange={handleFile}
        />

        <button>Create</button>
      </form>
      <button onClick={() => setAdd(!add)}>cancel</button>
    </section>
  );

  return content;
};
