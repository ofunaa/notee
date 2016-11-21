
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
      respond_to do |format|
        if @token = Token.find_by_access_token(session[:access_token]).destroy!
          session.delete(:access_token)
          format.json { render json: @token, status: 200 }
          else
          format.json { render json: @token.errors, status: :unprocessable_entity }
        end
      end
    end
  end
end
