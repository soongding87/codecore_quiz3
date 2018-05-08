import React from 'react';
import { BidDetails } from './BidDetails';

function BidList(props) {
  const { bids = [], onBidDeleteClick = () => {} } = props;

  return (
    <ul className="BidList">
      {
        bids.map((bid, index) => (
          <li key={bid.id}>
            <BidDetails onDeleteClick={onBidDeleteClick} {...bid} />
          </li>
        ))
      }
    </ul>
  );
}

export { BidList };
