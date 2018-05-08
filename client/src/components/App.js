import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { SignInPage } from "./SignInPage";
import { NavBar } from "./NavBar";
import { HomePage } from "./HomePage";
import { AuthRoute } from "./AuthRoute";
import { AuctionShowPage } from "./AuctionShowPage";
import { AuctionIndexPage } from "./AuctionIndexPage";
import { AuctionNewPage } from "./AuctionNewPage";
import { NotFoundPage } from "./NotFoundPage";
import jwtDecode from "jwt-decode";



class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: null
    }

    this.signInUser =  this.signInUser.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
  }

  componentWillMount () {
    this.signInUser();
  }

  signOutUser() {
    localStorage.removeItem("JWT");
    this.setState({user: null});
  }

  signInUser() {
    const jwt = localStorage.getItem("JWT");

    if (jwt) {
      const payload = jwtDecode(jwt);

      this.setState({
        user: payload
      });
    }
  }

  render () {
    const { user } = this.state;
    // Whe using react-router, you must the <Router> component
    // the root component of your application. <Router> component
    // can only have one child.
    return (
      <Router>
        <div className="App">
          <NavBar user={user} onSignOut={this.signOutUser} />
          <Switch>

            <Route exact path="/" component={HomePage} />
            <Route
              path="/sign_in"
              render={
                props =>
                  <SignInPage {...props} onSignIn={this.signInUser} />
              }
            />
            <AuthRoute
              isAuthenticated={!!user}
              exact
              path="/auctions"
              component={AuctionIndexPage}
            />
            <AuthRoute
              isAuthenticated={!!user}
              path="/auctions/new"
              component={AuctionNewPage}
            />
            <AuthRoute
              isAuthenticated={!!user}
              path="/auctions/:id"
              component={AuctionShowPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export { App };
