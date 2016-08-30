
require_dependency 'notee/application_controller'

module Notee
  class StatusesController < ApplicationController
    def index
      @statuses = Notee::STATUS
      render json: { status: 'success', statuses: @statuses }
    end

    def show
      statuses = Notee::STATUS
      @status = statuses.key(params[:status].to_i)
      render json: { status: 'success', name: @status }
    end
  end
end
