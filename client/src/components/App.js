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
  }, []);

  const changeUserId = (newId) => {
    if (newId.length > 0 && newId.length < 16) {
      setUserId(newId);
    }
  };

  return (
    <div className="App-container">
      <Router>
        <Chat path="/" userId={userId} changeUserId={changeUserId} />
        <NotFound default />
      </Router>
    </div>
  );
};

export default App;
