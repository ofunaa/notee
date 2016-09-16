
require_dependency 'notee/application_controller'

module Notee
  class TokensController < ApplicationController
    skip_before_filter :restrict_access_json, only: [:new, :create]

    def new
    end

    def create
      if Notee.notee_id == params[:id] && Notee.notee_password == params[:password]
        if token = Token.create!
          session[:access_token] = token.access_token
          return redirect_to root_path
        end
      end

      if now_user = User.sign_in(params[:id], params[:password])
        if token = Token.create!(user_id: now_user.id)
          session[:access_token] = token.access_token
        end
      end

      redirect_to root_path
    end

    def destroy
      Token.find_by_access_token(session[:access_token]).destroy!
      session.delete(:access_token)
    end
  end
end
