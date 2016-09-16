module Notee
  class ApplicationController < ActionController::Base
    before_action :restrict_access_json

    def restrict_access_json
      redirect_to new_token_path && return unless confirm_expired_token
      redirect_to new_token_path && return unless confirm_exist_token
    end

    private

    def confirm_exist_token
      if Token.exists?(access_token: session[:access_token])
        return true
      else
        session.delete(:access_token)
        return false
      end
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
