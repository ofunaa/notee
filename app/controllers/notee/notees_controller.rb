require_dependency "notee/application_controller"

module Notee
  class NoteesController < ApplicationController

    # callbacks
    skip_before_action :restrict_access_json, only: [:index]
    before_action :restrict_access, only: [:index]

    def index
    end

    private

    def restrict_access
      # authenticate_or_request_with_http_token do |token, options|
      #   Token.exists?(access_token: token)
      # end

      unless Token.exists?(access_token: session[:access_token])
        redirect_to new_token_path and return
      end

    end
  end
end
