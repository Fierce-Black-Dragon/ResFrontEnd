import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useSignupMutation } from "./authApiSlice";
import "../../style/register.css";
// const USER_REGEX = //;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const PHONE_REGEX = /^[0-9]{10}$/;
const initial = {
  name: "",
  email: "",
  password: "",

  mobile: 0,
};
const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [userForm, setUserForm] = useState(initial);

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidMatch(userForm.password === matchPwd);
  }, [userForm.password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [userForm]);
  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack

    try {
      const userData = await signup(userForm).unwrap();
      const user = {
        name: userData.name,
        role: userData.role,
      };

      dispatch(setCredentials({ ...userData, user }));

      localStorage.setItem("profile", JSON.stringify(userData));

      setUserForm(initial);

      navigate("/");
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
  };
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Name:
              {validName ? "valid" : ""}
              {validName || !userForm.name ? "" : "invalid"}
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={handleChange}
              name="name"
              required
              aria-invalid={validName ? "false" : "true"}
              pattern="[a-zA-Z]{4,}"
              title=" 4 to 24 characters.
  
              Must begin with a letter.
         
              Letters, numbers, underscores, hyphens allowed."
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Phone:</label>
            <input
              type="number"
              name="mobile"
              id="phone"
              onChange={handleChange}
              pattern={PHONE_REGEX}
              title=" enter valid 9   digit number"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />

            <label htmlFor="confirm_pwd">
              Confirm Password:
              {validMatch && matchPwd ? "valid" : ""}
              {validMatch || !matchPwd ? "" : "invalid"}
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              title="       Must match the first password input field."
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />

            <button type="submit">Sign Up</button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
