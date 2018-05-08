import React, { Component } from "react"
import { AuctionForm } from "./AuctionForm";
import { Auction } from "../requests/auction";


class AuctionNewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validationErrors: []
    };

    this.createAuction = this.createAuction.bind(this);
  }

  createAuction(params) {
    Auction
      .create(params)
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
          const auctionId = data.id;
          this.props.history.push(`/auctions/${auctionId}`);
        }
      })
  }

  render() {
    return (
      <main className="AuctionNewPage">
        <h2>Auction New Page</h2>
        <AuctionForm
          errors={this.state.validationErrors}
          onSubmit={this.createAuction}
        />
      </main>
    );
  }
}
export { AuctionNewPage };
