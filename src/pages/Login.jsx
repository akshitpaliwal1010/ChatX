import React from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = React.useState(false);

  function handleChange(event) {
    setLoginFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        await signInWithEmailAndPassword(auth, loginFormData.email, loginFormData.password);
        navigate("/");

    } catch (err) {
        setError(true);
        console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Chat<span className="blackX">X</span></h2>
        <p>Login</p>
        <form className="register-container-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            onChange={handleChange}
            name="email"
            value={loginFormData.email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={handleChange}
            name="password"
            value={loginFormData.password}
          />
          <button className="sign-in-btn">Sign in</button>
        </form>
        {error && <span>Something went wrong!</span>}
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
