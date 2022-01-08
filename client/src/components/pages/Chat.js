import React, { Component, useState, useEffect, useRef } from "react";
import SingleMessage from "../modules/SingleMessage.js";
import { NewMessage } from "../modules/NewPostInput.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import { socket } from "../../client-socket.js";

import "./Chat.css";
import message from "../../../../server/models/message.js";

// const GOOGLE_CLIENT_ID = "47158948379-484n2r7232ng9pbg3agh9k8r4o40qj2c.apps.googleusercontent.com";
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    get("/api/chat").then((messages) => {
      setMessages(messages);
    });
  }, []);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  socket.on("message", (newMessage) => {
    setMessages([...messages, newMessage]);
  });

  return (
    <div className="u-relative u-flexColumn Chat-container">
      {props.userId ? (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={props.handleLogout}
          onFailure={(err) => console.log(err)}
          className="NavBar-link NavBar-login"
        />
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={props.handleLogin}
          onFailure={(err) => console.log(err)}
          className="NavBar-link NavBar-login"
        />
      )}
      {props.userId ? (
        <>
          <h3>Global Chat Deploy</h3>
          <div className="Chat-historyContainer" id="historyContainer">
            {messages.map((messageObj) => (
              <SingleMessage sender={messageObj.sender.name} content={messageObj.content} />
            ))}
            <AlwaysScrollToBottom />
          </div>
          <div className="Chat-newContainer">
            <NewMessage />
          </div>
        </>
      ) : (
        <h3>Please Log In To Access Global Chat Deploy</h3>
      )}
    </div>
  );
};

export default Chat;
