
require_dependency 'notee/application_controller'

module Notee
  class RolesController < ApplicationController
    def index
      render json: { status: 'success', roles: User.roles }
    end

    def show
      user = find_user_by_access_token

      if user
        render json: { status: 'success', user: user }
      else
        render json: { status: 'failed' }
      end
    end

    private

    def find_user_by_access_token
      token = Token.find_by(access_token: session[:access_token])
      token.user
    end
  end
end
