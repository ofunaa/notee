require_dependency "notee/application_controller"

module Notee
  class NoteeImagesController < ApplicationController
    before_action :set_notee_image, only: [:show, :edit, :update, :destroy]

    # GET /notee_images
    def index
      @notee_images = NoteeImage.all
    end

    # GET /notee_images/1
    def show
    end

    # GET /notee_images/new
    def new
      @notee_image = NoteeImage.new
    end

    # GET /notee_images/1/edit
    def edit
    end

    # POST /notee_images
    def create
      @notee_image = NoteeImage.new(notee_image_params)

      if @notee_image.save
        redirect_to @notee_image, notice: 'Notee image was successfully created.'
      else
        render :new
      end
    end

    # PATCH/PUT /notee_images/1
    def update
      if @notee_image.update(notee_image_params)
        redirect_to @notee_image, notice: 'Notee image was successfully updated.'
      else
        render :edit
      end
    end

    # DELETE /notee_images/1
    def destroy
      @notee_image.destroy
      redirect_to notee_images_url, notice: 'Notee image was successfully destroyed.'
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_notee_image
        @notee_image = NoteeImage.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def notee_image_params
        params.require(:notee_image).permit(:content)
      end
  end
end
