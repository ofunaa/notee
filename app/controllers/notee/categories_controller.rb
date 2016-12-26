
require_dependency 'notee/application_controller'

module Notee
  class CategoriesController < ApplicationController
    before_action :set_category, only: [:show, :update, :destroy]

    def index
      @categories = Category.where(is_deleted: false)
      render json: { status: 'success', categories: @categories }
    end

    def show
      render json: { status: 'success', category: @category }
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
      Category.transaction do
        respond_to do |format|
          if @category.update(slug: nil, is_deleted: true)
            format.json { render json: @category, status: 200 }
          else
            format.json { render json: @category.errors, status: :unprocessable_entity }
          end
        end
      end
    end

    private

    def category_params
      params.require(:category).permit(:name, :slug, :parent_id, :is_private)
    end

    def set_category
      @category = Category.find_by(id: params[:id])
    end
  end
end
