import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Message({message}) {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth"
    });
  },[message]);

  // console.log(message);
  return (
    <div className={`message ${message.senderId === currentUser.uid && "admin"}`}>
      <div className="message-info">
        <img
          src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
          alt=""
        />
        <p>just now</p>
      </div>
      <div className="message-content">
        <p>
          {message.text}
        </p>
        {message.img && <img
          src={message.img}
          alt=""
        />}
      </div>
    </div>
  );
}
