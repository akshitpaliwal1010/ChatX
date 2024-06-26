import React from "react";
import Navbar from "../components/Navbar.jsx";
import Search from "../components/Search.jsx";
import Chats from "../components/Chats.jsx";

export default function Sidebar() {
   return(
       <div className="sidebar">
        <Navbar />
        <Search />
        <Chats />
       </div>
   )
}