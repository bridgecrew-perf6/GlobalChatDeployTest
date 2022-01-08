import React, { Component, useState, useEffect } from "react";

import "./NewMessage.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewMessage = (props) => {
  const [value, setValue] = useState("");

  const sendMessage = (currValue) => {
    console.log("GOT HRE AT LEAST!");
    console.log(currValue);
    if (currValue.toString().length !== 0) {
      const body = { content: currValue };
      post("/api/message", body).then(() => {
        console.log("MESSAGE ENTERED");
      });
    }
  };

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    console.log("ENTERED HERE");
    // event.preventDefault();
    console.log(value);
    const currValue = value.toString();
    console.log(currValue);
    sendMessage(currValue);
    setValue("");
  };

  // NEW CODED THAT I ADDED - ERIC
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed!");
        handleSubmit(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={"New Message"}
        value={value}
        onChange={handleChange}
        className="NewMessage-input"
      />
      <button
        type="submit"
        className="NewMessage-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default NewMessage;
