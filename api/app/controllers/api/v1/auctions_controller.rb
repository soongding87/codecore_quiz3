class Api::V1::AuctionsController < Api::ApplicationController
  before_action :authenticate_user!


  def create
    q = Auction.new auction_params
    q.user = current_user
    q.save!
    render json: { id: q.id }
  end

  def show
    auction = Auction.find params[:id]
    bids = auction.bids
    render json: { auction: auction, bids: bids}
  end

  def index
    puts params
    auctions = Auction
      .includes(:user, bids: [:user])
      .order(created_at: :desc)

    render json: auctions
  end

  def destroy
  end

  def update
  end

  def auction_params
    params.require(:auction).permit(:title, :description, :price)
  end
end
