import React, { useState, Component } from "react";

import "./SingleMessage.css";

const SingleMessage = (props) => {
  return (
    <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      <span className=" SingleMessage-sender u-bold">{props.sender}</span>
      <span className="SingleMessage-content">{props.content}</span>
    </div>
  );
};

export default SingleMessage;
