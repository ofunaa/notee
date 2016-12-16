
require_dependency 'notee/application_controller'

require 'open-uri'
require 'json'
require 'uri'

module Notee
  class TokensController < ApplicationController
    skip_before_filter :restrict_access_json, only: [:new, :create]

    def new
    end

    def create
      check_recaptcha if Rails.env.production?
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

    def check_recaptcha
      endpoint = 'https://www.google.com/recaptcha/api/siteverify?secret=' + Notee.recaptcha_secret_key + '&response=' + params["g-recaptcha-response"]
      uri = URI.parse(endpoint)
      json = Net::HTTP.get(uri)
      result = JSON.parse(json)
      if result["success"] == false
        raise
      end
    end
  end
end
