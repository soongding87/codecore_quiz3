import React from "react";

function BidForm(props) {
  const { onSubmit = () => {} } = props;

  const handleSubmit = event => {
    event.preventDefault();
    const { currentTarget } = event;
    const fD = new FormData(currentTarget);

    onSubmit({
      bid_price: fD.get("bid_price")
    });

    currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="BidForm">
      <input cols="40" rows="4" name="bid_price"/><br />
      <input type="submit" value="Submit"/>
    </form>
  )
}

export { BidForm };
