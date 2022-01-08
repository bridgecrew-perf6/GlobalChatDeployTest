import React, { useState, useEffect, Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

// NEW IMPORTS

import Chat from "./pages/Chat.js";

// to use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    document.title = "Global Chat Deploy";
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <div className="App-container">
      <Router>
        <Chat path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <NotFound default />
      </Router>
    </div>
  );
};

export default App;
