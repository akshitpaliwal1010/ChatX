import React, { useContext } from "react";
import Messages from "./Messages.jsx";
import Input from "./Input.jsx";
import { ChatContext } from "../context/ChatContext.jsx";

export default function Chat() {

  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat-topbar">
        <p>{data.user?.displayName}</p>
        <div className="chat-topbar-icon">
          <i class="fi fi-rr-video-camera-alt"></i>
          <i class="fi fi-rr-user-add"></i>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
