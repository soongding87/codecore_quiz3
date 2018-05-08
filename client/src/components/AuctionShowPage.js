import React, { Component } from "react";
import { AuctionDetails } from "./AuctionDetails";

import { BidForm } from "./BidForm";
import { Auction } from "../requests/auction";
import { Bid } from "../requests/bid";




class AuctionShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      auction: {},
      bids: {}
    };

    this.deleteAuction = this.deleteAuction.bind(this);
    this.deleteBid = this.deleteBid.bind(this);
    this.createBid = this.createBid.bind(this);
  }

  componentDidMount() {

    const auctionId = this.props.match.params.id;

    Auction
      .one(auctionId)
      .then(auction => {
        this.setState({auction: auction.auction , bids: auction.bids, loading: false});
      });
  }

  deleteAuction() {
    this.setState({
      auction: {}
    })
  }

  createBid(params) {

    Bid
      .create(params,this.props.location.pathname)
      .then(data => {
        if (data.errors) {
          this.setState({
            validationErrors: data
              .errors
              .filter(
                e => e.type = "ActiveRecord::RecordInvalid"
              )
          })
        } else {
          this.props.history.push(this.props.location.pathname);
        }
      })
  }

  deleteBid(bidId) {
    const { auction } = this.state;
    const { bids = [], ...restAuction } = auction;

    this.setState({
      auction: {
        ...restAuction,
        bids: bids.filter(a => a.id !== bidId)
      }
    })
  }
  render() {

    if (this.state.loading) {
      return (
        <main className="AuctionShowPage">
          <h2>Loading Auction...</h2>
        </main>
      )
    }

    if (!this.state.auction.id) {
      return (
        <main className="AuctionShowPage">
          <h2>Auction doesn't exist!</h2>
        </main>
      )
    }
    console.log(this.state.bids)
    return (
      <main className="AuctionShowPage">
        <AuctionDetails {...this.state.auction} />
        <h2>Bids</h2>

        <ul>
          {
            this.state.bids.map(
              (bid, index) => (
                <li key={bid.id}>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                   <p> $ {bid.bid_price} </p>at  {bid.created_at}

                  </div>
                </li>
              )
            )
          }
        </ul>

         <BidForm
          onSubmit={this.createBid}
        />

      </main>
    )
  }
}

export { AuctionShowPage };
