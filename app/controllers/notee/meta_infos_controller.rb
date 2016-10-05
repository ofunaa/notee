require_dependency "notee/application_controller"

module Notee
  class MetaInfosController < ApplicationController
    before_action :set_meta_info, only: [:show, :edit, :update, :destroy]

    # GET /meta_infos
    def index
      @meta_infos = MetaInfo.all
    end

    # GET /meta_infos/1
    def show
    end

    # GET /meta_infos/new
    def new
      @meta_info = MetaInfo.new
    end

    # GET /meta_infos/1/edit
    def edit
    end

    # POST /meta_infos
    def create
      @meta_info = MetaInfo.new(meta_info_params)

      if @meta_info.save
        redirect_to @meta_info, notice: 'Meta info was successfully created.'
      else
        render :new
      end
    end

    # PATCH/PUT /meta_infos/1
    def update
      if @meta_info.update(meta_info_params)
        redirect_to @meta_info, notice: 'Meta info was successfully updated.'
      else
        render :edit
      end
    end

    # DELETE /meta_infos/1
    def destroy
      @meta_info.destroy
      redirect_to meta_infos_url, notice: 'Meta info was successfully destroyed.'
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_meta_info
        @meta_info = MetaInfo.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def meta_info_params
        params.fetch(:meta_info, {})
      end
  end
end
