import React, { Component } from "react"
import { Link } from "react-router-dom";
import { Auction } from "../requests/auction";

class AuctionIndexPage extends Component {
  constructor(props) {
      super(props);

      this.state = {
        page: 1,
        loading: true,
        auctions: []
      }

      // Methods that used as callbacks will no longer
      // be owned by their instance once they're called meaning
      // that their `this` will be either `undefined` or
      // `Window`. Use the `bind` on the method to permanently
      // set its `this` to the instance's `this`.
      this.deleteAuction = this.deleteAuction.bind(this);
    }
  

    componentWillMount () {
      const queryString = this.props.location.search;
      const page = new URLSearchParams(queryString).get("page") || 1;

      this.setState({
        page: page
      });
    }

    componentDidMount () {
      Auction
        .all({page: this.state.page})
        .then(auctions => {
          this.setState({auctions: auctions, loading: false})
        });
    }

    deleteAuction (auctionId) {
      return () => {
        const { auctions } = this.state;

        this.setState({
          auctions: auctions.filter(q => q.id !== auctionId)
        });
      };
    }

    render () {
      if (this.state.loading) {
        return (
          <main className="AuctionIndexPage">
            <h2>Loading Auctions...</h2>
          </main>
        );
      }

      return (
        <main className="AuctionIndexPage">
          <h2>Auctions</h2>
          <ul>
            {
              this.state.auctions.map(
                (auction, index) => (
                  <li key={auction.id}>
                    <Link to={`/auctions/${auction.id}`}>
                      {auction.title}
                    </Link>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}>

                    </div>
                  </li>
                )
              )
            }
          </ul>
        </main>
      );
    }
  }

  export { AuctionIndexPage };
