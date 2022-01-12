import React, { useState, useEffect, useRef, Component } from "react";
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
  const [idBad, setIdBad] = useState(false);

  useEffect(() => {
    document.title = "Global Chat Deploy";
  }, []);

  const changeUserId = (newId) => {
    // function should more accurately be called log in
    const prohibitedWords = [
      "eric",
      "wang",
      "emma",
      "liwei",
      "dillon",
      "xiaojun",
      "sabrina",
      "cai",
    ];
    let containsProhibited = false;
    for (const word of prohibitedWords) {
      if (newId.toString().toLowerCase().includes(word)) {
        containsProhibited = true;
      }
    }
    if (newId.length <= 0 || newId.length >= 16 || containsProhibited) {
      setIdBad(true);
    } else {
      setUserId(newId);
      if (newId !== "spectatormode") {
        const body = { name: "KEY714" + newId, content: " logged in" };
        post("/api/message", body);
      }
    }
  };

  return (
    <div className="App-container">
      <Router>
        <Chat id="chat" path="/" userId={userId} changeUserId={changeUserId} idBad={idBad} />
        <NotFound default />
      </Router>
    </div>
  );
};

export default App;
