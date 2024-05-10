import React, { useContext, useState } from "react";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate, Navigate, useSearchParams } from "react-router-dom"; 

export default function Register() {

  const navigate = useNavigate();

  // const {setCurrentUser} = useContext(AuthContext);

  const [regFormData, setRegFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = React.useState(false);
  // const [disabled, setDisabled] = React.useState(false);
  const [style, setStyle] = useState("disable");

  function handleChange(event) {
    setRegFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const randomNum = Math.random() * 1000 + 1;
    const photoURL = `https://api.multiavatar.com/${randomNum}.png?apikey=3xmnSqH2zK5Bw6`;

    // setDisabled(true);
    setStyle("yesDisable");

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        regFormData.email,
        regFormData.password
      );

      // const date = new Date().getTime();
      // const storageRef = ref(storage, `${regFormData.name+date}`);

      // await uploadBytesResumable(storageRef, file).then(() => {
      //   getDownloadURL(storageRef).then(async(downloadURL) => {
      //     await updateProfile(res.user,{
      //       displayName: regFormData.name,
      //       photoURL: downloadURL,
      //     });
      //     // console.log("File available at", downloadURL);
      //     await setDoc(doc(db, "users", res.user.uid),{
      //       uid: res.user.uid,
      //       name: regFormData.name,
      //       email: regFormData.email,
      //       photoURL: downloadURL,
      //     });

      //     await setDoc(doc(db, "userChats", res.user.uid), {});
      //     navigate("/");
      //     window.location.reload(false);
      //   });
        
      // });

      await updateProfile(res.user,{
        displayName: regFormData.name,
        photoURL: photoURL,
      });

      await setDoc(doc(db, "users", res.user.uid),{
        uid: res.user.uid,
        name: regFormData.name,
        email: regFormData.email,
        photoURL: photoURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
      window.location.reload(false);
      
      // console.log(res.user);

      // setDisabled(false);

    } catch (err) {
      setError(true);
      console.log(err);
      // setDisabled(false);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Chat<span className="blackX">X</span></h2>
        <p>Register</p>
        <form className="register-container-form" onSubmit={handleSubmit}>
          <input required 
            type="text"
            placeholder="name"
            onChange={handleChange}
            name="name"
            value={regFormData.name}
          />
          <input required 
            type="email"
            placeholder="email"
            onChange={handleChange}
            name="email"
            value={regFormData.email}
          />
          <input required 
            type="password"
            placeholder="password"
            onChange={handleChange}
            name="password"
            value={regFormData.password}
          />
          {/* <div className="register-container-addimg">
            <input type="file" id="file" />
            <label htmlFor="file">
              <i className="fi fi-rr-graphic-style"></i> Add an avatar
            </label>
          </div> */}
          <button className={style}>Sign up</button>
          {style=="yesDisable" && <span>Please Wait!!</span>}
          {error && <span>Something went wrong!</span>}
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
