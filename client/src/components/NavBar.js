import React from "react";
import { NavLink } from "react-router-dom";

function NavBar (props) {
  const { user, onSignOut = () => {} } = props;

  const handleSignout = event => {
    event.preventDefault();
    onSignOut();
  }

  return (
    <nav className="NavBar">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/auctions/new">New Auction</NavLink>
      <NavLink exact to="/auctions">Auctions </NavLink>
      {user ? (
        [
          <span>Hello, {user.first_name}!</span>,
          <a href="" onClick={handleSignout}>Sign Out</a>
        ].map((el, i) => React.cloneElement(el, {key: i}))
      ) : (
        <NavLink exact to="/sign_in">Sign In</NavLink>
      )}
    </nav>
  );
}

export { NavBar };
