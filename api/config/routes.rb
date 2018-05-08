Rails.application.routes.draw do


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :auctions, shallow: true do
      resources :bids, only: [:create, :destroy]
    end

      resources :tokens, only: [:create]
    end

  end
end
