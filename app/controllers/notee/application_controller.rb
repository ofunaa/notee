module Notee
  class ApplicationController < ActionController::Base
    before_action :restrict_access_json

    def restrict_access_json
      return redirect_to new_token_path unless confirm_exist_token
      return redirect_to new_token_path unless confirm_expired_token
    end

    private

    def confirm_exist_token
      unless Token.exists?(access_token: session[:access_token])
        session.delete(:access_token)
        return false
      end

      true
    end

    def confirm_expired_token
      token = Token.find_by(access_token: session[:access_token])
      return false unless token

      if Time.now > token.expires_at
        token.destroy
        session.delete(:access_token)
        return false
      end

      true
    end
  end
end
