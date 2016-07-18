module Notee
  class ApplicationController < ActionController::Base

    before_action :set_access_token
    before_action :restrict_access_json

    private
    def set_access_token
      # request['Authorization: Token token'] = session[:access_token] if session[:access_token].present?
    end

    def restrict_access_json
      # authenticate_or_request_with_http_token do |token, options|
      #   Token.exists?(access_token: token)
      # end

      unless Token.exists?(access_token: session[:access_token])
        raise
      end
    end

  end
end
