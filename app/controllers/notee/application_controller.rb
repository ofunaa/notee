module Notee
  class ApplicationController < ActionController::Base
    before_action :restrict_access_json

    def restrict_access_json
      raise unless confirm_exist_token
      raise unless confirm_expired_token
    end

    private

    def confirm_exist_token
      Token.exists?(access_token: session[:access_token])
    end

    def confirm_expired_token
      token = Token.find_by(access_token: session[:access_token])
      if Time.now > token.expires_at
        token.destroy
        session.delete(:access_token)
        return false
      end

      true
    end
  end
end
