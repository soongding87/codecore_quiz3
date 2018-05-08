import React from "react";

function AuctionDetails(props) {
  return (
    <div className="AuctionDetails">
      <h1>title: {props.title}</h1>
      <p>description: {props.description}</p>
      <p>price: {props.price}</p>
    </div>
  );
}

export { AuctionDetails };
