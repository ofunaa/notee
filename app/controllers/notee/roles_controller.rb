
require_dependency "notee/application_controller"

module Notee
  class RolesController < ApplicationController

    def index
      return User.roles
    end

    def show
      token = Token.find_by(access_token: session[:access_token])
      render json: { status: 'success', role: token.user.role}
    end

  end
end
