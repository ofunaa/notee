require_dependency "notee/application_controller"

module Notee
  class NoteeCategoriesController < ApplicationController
    before_action :set_notee_category, only: [:show, :edit, :update, :destroy]

    # GET /notee_categories
    def index
      @notee_categories = NoteeCategory.all
    end

    # GET /notee_categories/1
    def show
    end

    # GET /notee_categories/new
    def new
      @notee_category = NoteeCategory.new
    end

    # GET /notee_categories/1/edit
    def edit
    end

    # POST /notee_categories
    def create
      @notee_category = NoteeCategory.new(notee_category_params)

      if @notee_category.save
        redirect_to @notee_category, notice: 'Notee category was successfully created.'
      else
        render :new
      end
    end

    # PATCH/PUT /notee_categories/1
    def update
      if @notee_category.update(notee_category_params)
        redirect_to @notee_category, notice: 'Notee category was successfully updated.'
      else
        render :edit
      end
    end

    # DELETE /notee_categories/1
    def destroy
      @notee_category.destroy
      redirect_to notee_categories_url, notice: 'Notee category was successfully destroyed.'
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_notee_category
        @notee_category = NoteeCategory.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def notee_category_params
        params.require(:notee_category).permit(:name, :slug, :parent_id, :status)
      end
  end
end
