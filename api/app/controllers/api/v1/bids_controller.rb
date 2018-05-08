class Api::V1::BidsController < Api::ApplicationController
  before_action :authenticate_user!

  def create
    b = Bid.new bid_params
    b.auction = Auction.find params[:auction_id]
    b.user = current_user
    b.save!
    render json: { id: b.id }

  end

  def destroy
  end

  def bid_params
    params.require(:bid).permit(:bid_price)
  end
end
