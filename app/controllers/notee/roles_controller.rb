
require_dependency "notee/application_controller"

module Notee
  class RolesController < ApplicationController

    def index
      return User.roles
    end

    def show
      token = Token.find_by(access_token: session[:access_token])
      render json: { status: 'success', user: token.user}
    end

  end
end