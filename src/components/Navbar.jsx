import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className="navbar">
      <h2>ChatX</h2>
      <img
        src={currentUser?.photoURL}
        alt=""
      />
      <p>{currentUser.displayName}</p>
      <button onClick={()=>signOut(auth)}>logout</button>
    </div>
  );
}
