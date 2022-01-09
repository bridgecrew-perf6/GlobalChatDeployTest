import React, { useState, Component } from "react";

import "./SingleMessage.css";

const SingleMessage = (props) => {
  let dayHalf = "AM";

  const convertToTwoDigits = (value) => {
    let str = value.toString();
    if (str.length === 1) {
      str = "0" + str;
    }
    return str;
  };

  const dateObj = new Date(Date.parse(props.dateString));

  let hours = convertToTwoDigits(dateObj.getHours());
  if (parseInt(hours) > 12) {
    hours -= 12;
    hours = hours.toString();
    dayHalf = "PM";
  }
  if (hours[0] === "0") {
    hours = hours[1];
  }

  let minutes = convertToTwoDigits(dateObj.getMinutes());
  let seconds = convertToTwoDigits(dateObj.getSeconds());

  const timestamp =
    "" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getDate() +
    "/" +
    dateObj.getFullYear() +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    dayHalf +
    " EST";

  return (
    <div className="SingleMessage-outerContainer">
      <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
        <div className="SingleMessage-sender u-bold">{props.sender}</div>
        <div className="SingleMessage-content">{props.content}</div>
      </div>
      <div className="SingleMessage-timeDisplay">{timestamp}</div>
    </div>
  );
};

export default SingleMessage;
