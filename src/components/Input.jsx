import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {

    if(img){

      const storageRef = ref(storage, uuid);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

    }else{
      await updateDoc(doc(db, "chats", data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    });


    setText("");
    setImg(null);

  };

  return (
    <div className="input">
      <input 
      className="input-msg" 
      type="text" 
      name="" 
      id="" 
      placeholder="Type something..." 
      onChange={e=>setText(e.target.value)} 
      value={text}
      />
      <div className="input-icons">
        <i class="fi fi-rr-clip"></i>
        <label htmlFor="send-img">
          <input type="file" name="" id="send-img" onChange={e=>setImg(e.target.files[0])} />
          <i class="fi fi-rr-picture"></i>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
