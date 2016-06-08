
require_dependency "notee/application_controller"

module Notee
  class NoteeController < ApplicationController

    def index
      @notee_image = Image.all.first
      p @notee_image
    end

    def create

      @image = Image.new
      @image.content = params[:content]
      @image.save

      redirect_to :back
    end
  end
end
