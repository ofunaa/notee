
require_dependency "notee/application_controller"

module Notee
  class TokensController < ApplicationController
    skip_before_filter :restrict_access_json, only: [:new, :create]

    # GET /tokens/new
    def new
    end

    # POST /tokens
    def create
      if Notee.notee_id == params[:id] && Notee.notee_password == params[:password]
        if token = Token.create!
          session[:access_token] = token.access_token
        end
      end

      redirect_to root_path
    end

    # DELETE /tokens/1
    def destroy
      Token.find_by_access_token(session[:access_token]).destroy!
      session.delete(:access_token)
    end

  end
end
