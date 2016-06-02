class NoteeController < ApplicationController
  def index
    @notee_image = NoteeImage.all
  end

  def create
    @image = NoteeImage.new(content: params[:content])
    @image.save

    redirect_to :back
  end
end
