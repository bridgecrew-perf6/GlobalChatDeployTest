import React, { useState, Component } from "react";

import "./SingleMessage.css";

const SingleMessage = (props) => {
  const dateObj = new Date(Date.parse(props.dateString));
  console.log(dateObj.toString());
  const timestamp =
    "" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getDate() +
    "/" +
    dateObj.getFullYear() +
    " " +
    dateObj.getHours() +
    ":" +
    dateObj.getMinutes() +
    ":" +
    dateObj.getSeconds() +
    " EST";
  return (
    <p className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      <span className="SingleMessage-sender u-bold">{props.sender}</span>
      <span className="SingleMessage-content">{props.content}</span>
      <span className="SingleMessage-timeDisplay">{timestamp}</span>
    </p>
  );
};

export default SingleMessage;
