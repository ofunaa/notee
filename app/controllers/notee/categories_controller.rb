
require_dependency "notee/application_controller"

module Notee
  class CategoriesController < ApplicationController
    before_action :set_category, only: [:update, :destroy]

    def index
      @categories = Category.all
      render json: { status: 'success', categories: @categories}
    end

    def create
      @category = Category.new(category_params)
      respond_to do |format|
        if @category.save
          format.json { render json: @category, status: 200 }
        else
          format.json { render json: @category.errors, status: :unprocessable_entity }
        end
      end
    end

    def update
      respond_to do |format|
        if @category.update(category_params)
          format.json { render json: @category, status: 200 }
        else
          format.json { render json: @category.errors, status: :unprocessable_entity }
        end
      end
    end

    def destroy
      respond_to do |format|
        if @category.destroy
          format.json { render json: @category, status: 200 }
        else
          format.json { render json: @category.errors, status: :internal_server_error }
        end
      end
    end

    private

    def category_params
      params.require(:category).permit(:name, :slug, :parent_id, :status)
    end

    def set_category
      @category = Category.find_by(id: params[:id])
    end

  end
end
