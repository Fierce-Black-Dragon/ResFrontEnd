import React, { useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import Input from "../../components/Input";
import { selectCurrentToken, selectCurrentUser } from "../auth/authSlice";
import "./css/review.css";
import { useAddMutation } from "./reviewApiSlice";
import { setReviews } from "./reviewSlice";
const AddReview = ({ write, setWrite }) => {
  const [form, setForm] = useState({
    name: "",
    comment: "",
    rating: 0.0,
  });
  //   const token = useSelector(selectCurrentToken);
  //   const user = useSelector(selectCurrentUser);
  const [add, { isLoading, isSuccess }] = useAddMutation();
  const errRef = useRef();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [IsEmail, setIsEmail] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.rating > 5.0 || form.rating < 0.0) {
      setErrMsg("Rating must be between 1.0 and 5.0");
      errRef.current.style.display = "block";
      return;
    } else {
      try {
        const Data = await add(form).unwrap();

        if (isSuccess) {
          return <h4>success</h4>;
        }
        setTimeout(() => {
          setWrite(!write);
        }, 1000);
      } catch (err) {
        if (!err?.originalStatus) {
          // isLoading: true until timeout occurs
          setErrMsg("No Server Response");
        } else if (err.originalStatus === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.originalStatus === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      }
    }
  };
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h3>Add Review</h3>
      <form onSubmit={handleSubmit}>
        <Input
          label={"email"}
          type="text"
          name="email"
          required
          placeholder="Enter name"
          handleChange={handleChange}
        />
        {form.email?.length !== 0 ? (
          <Input
            label={"Mobile Number"}
            type="number"
            name="mobile"
            placeholder="Enter mobile"
            handleChange={handleChange}
          />
        ) : (
          ""
        )}

        <Input
          label={"Name"}
          type="text"
          name="name"
          required
          placeholder="Enter  name"
          handleChange={handleChange}
        />
        <Input
          label={"Comment"}
          type="text"
          name="comment"
          required
          placeholder="Enter  your comment"
          handleChange={handleChange}
        />
        <Input
          label={"Rating"}
          type="number"
          step={0.01}
          min="1.00"
          max="5.00"
          name="rating"
          required
          placeholder={"Enter  your rating"}
          handleChange={handleChange}
        />
        <button type="button" onClick={() => setWrite(!write)}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default AddReview;
