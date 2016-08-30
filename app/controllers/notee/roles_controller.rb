
require_dependency 'notee/application_controller'

module Notee
  class RolesController < ApplicationController
    def index
      User.roles
    end

    def show
      user = get_user_by_access_token
      render json: { status: 'success', user: user }
    end

    private

    def get_user_by_access_token
      token = Token.find_by(access_token: session[:access_token])
      token.user
    end
  end
end
