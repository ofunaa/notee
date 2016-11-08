
require_dependency 'notee/application_controller'

module Notee
  class TokensController < ApplicationController
    skip_before_filter :restrict_access_json, only: [:new, :create]

    def new
    end

    def create
      User.sign_in(params[:id], params[:password])
      redirect_to root_path
    end

    def destroy
      Token.find_by_access_token(session[:access_token]).destroy!
      session.delete(:access_token)
    end
  end
end
