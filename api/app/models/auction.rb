class Auction < ApplicationRecord
  has_many :bids , dependent: :destroy
  belongs_to :user


end
