class Api::V1::TokensController < Api::ApplicationController
  def create
    user = User.find_by_email params[:email]

    if user&.authenticate(params[:password])
      token = JWT.encode({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name
        },
        Rails.application.secrets.secret_key_base)

      render json: { jwt: token }
    else
      head :unauthorized
    end
  end
end
