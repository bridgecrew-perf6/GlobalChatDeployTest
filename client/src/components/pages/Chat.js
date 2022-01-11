import React, { Component, useState, useEffect, useRef } from "react";
import SingleMessage from "../modules/SingleMessage.js";
import { NewMessage, LoginBar } from "../modules/NewPostInput.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import { socket } from "../../client-socket.js";

import "./Chat.css";
import message from "../../../../server/models/message.js";

const GOOGLE_CLIENT_ID = "47158948379-484n2r7232ng9pbg3agh9k8r4o40qj2c.apps.googleusercontent.com"; // own one
// const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com"; // belongs to web lab

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const stateRef = useRef();

  stateRef.current = messages;

  useEffect(() => {
    get("/api/chat").then((messages) => {
      setMessages(messages);
    });

    socket.on("message", (newMessage) => {
      console.log(messages);
      setMessages([...stateRef.current, newMessage]);
    });

    // return () => {
    //   socket.off("message");
    // };
  }, []);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <div className="u-relative u-flexColumn Chat-container">
      {props.userId ? (
        <>
          <h3 className="Chat-header">Live Global Chat Deploy Test</h3>
          <div className="Chat-historyContainer" id="historyContainer">
            {messages.map((messageObj) => (
              <SingleMessage
                sender={messageObj.sender.name}
                content={messageObj.content}
                dateString={messageObj.timestamp}
              />
            ))}
            <AlwaysScrollToBottom />
          </div>
          <div className="Chat-newContainer" className="Chat-newMessage">
            <NewMessage userId={props.userId} />
          </div>
        </>
      ) : (
        <>
          <h3>Enter Your Name Below</h3>
          <LoginBar changeUserId={props.changeUserId} />
        </>
      )}
    </div>
  );
};

export default Chat;
