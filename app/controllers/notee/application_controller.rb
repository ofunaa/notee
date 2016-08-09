module Notee
  class ApplicationController < ActionController::Base
    before_action :restrict_access_json

    private

    def restrict_access_json
      unless Token.exists?(access_token: session[:access_token])
        raise
      end
    end

  end
end
