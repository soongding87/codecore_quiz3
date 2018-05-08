class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token

  rescue_from StandardError, with: :standard_error
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  def not_found
    render(
      json: {
        errors: [{
          type: "NotFound"
        }]
      },
      status: :not_found # alias for 404 in rails
    )
  end

  private
  def current_user
    token = request.headers['AUTHORIZATION']

    data = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
    @user ||= User.find data['id']
  rescue JWT::DecodeError
    nil
  end

  def authenticate_user!
    head :unauthorized unless current_user.present?
  end

  protected

  def record_not_found(error)
    render(
      json: {
        errors: [{
          type: error.class.to_s,
          message: error.message
        }]
      },
      status: :not_found
    )
  end

  def standard_error(error)
    logger.error "#{error.class.to_s} #{error.message}"
    logger.error error.backtrace.join("\r\n")

    render(
      json: {
        errors: [{
          type: error.class.to_s,
          message: error.message
        }]
      },
      status: :internal_server_error # alias for status code 500
    )
  end

  def record_invalid(error)
    record = error.record
    errors = record.errors.map do |field, message|
      {
        type: error.class.to_s,
        record_type: record.class.to_s,
        field: field,
        message: message
      }
    end

    render(
      json: {
        errors: errors
      },
      status: :unprocessable_entity # alias for status code
    )
  end
end
