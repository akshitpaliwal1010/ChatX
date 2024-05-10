import React, { useContext, useState } from "react";
import { 
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {AuthContext} from "../context/AuthContext"

export default function Search() {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const {currentUser} = useContext(AuthContext);

    const handleSearch = async ()=>{

        const q = query(collection(db, "users"), where("name", "==", username));
        // console.log("This is from search....");
        // console.log(currentUser);
        // console.log("This is from search....");

        try{
            const querySnapshot = await getDocs(q);
            // console.log("Working Till now!!");
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                setUser(doc.data());
            });
        }catch(err){
            setErr(true);
        }
        
    }

    const handleKey= (e)=> {
        e.code === "Enter" && handleSearch();

    }

    const handleSelect= async ()=> {

        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        console.log(combinedId);

        try{

            const res = await getDoc(doc (db, "chats", combinedId));

            if(!res.exists()){
                await setDoc(doc (db, "chats", combinedId), { messages: [] });

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.name,
                        photoURL: user.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId+".userInfo"]: {
                        uid:currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId+".date"]: serverTimestamp()
                });

            }

        } catch(err){}

        setUser(null);
        setUsername("");

    }

   return(
       <div className="search">
            <input
            type="text" 
            placeholder="Find a user" 
            onKeyDown={handleKey} 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            />
            {err && <span>User not found!!</span>}
            {user && <div className="search-user border-bottom-offwhite" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="search-user-text">
                    <h3>{user.name}</h3>
                    <p>recent message</p>
                </div>
            </div>}
        </div>
   )
}