
require_dependency "notee/application_controller"

module Notee
  class ImagesController < ApplicationController

    def index
      @images = Image.all
      render json: { status: 'success', images: @images}
    end

    def show
    end

    def create

      @image = Image.new
      @image.file = params[:image]

      respond_to do |format|
        if @image.save
          format.json { render json: @image, status: 200 }
        else
          format.json { render json: @image.errors, status: :unprocessable_entity }
        end
      end

      # @image = Post.new(image_params)
      #
      # if @image.save
      #   redirect_to @image, notice: 'Post was successfully created.'
      # else
      #   render :new
      # end
    end

    def update
      if @image.update(image_params)
        redirect_to @image, notice: 'Post was successfully updated.'
      else
        render :edit
      end
    end

    def destroy
      @image.destroy
      redirect_to images_url, notice: 'Post was successfully destroyed.'
    end

    private

    def image_params
      params.require(:image).permit(:title, :content, :slug, :status, :image_id, :thumbnail_id, :published_at, :seo_keyword, :seo_description)
    end
  end
end
