
require_dependency "notee/application_controller"

module Notee
  class CategoriesController < ApplicationController

    def index
      @categories = Category.all
      render json: { status: 'success', categories: @categories}
    end

    def show
      render json: { status: 'success', cateory: @category}
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
      @category.destroy
      render json: { status: 'success'}
    end

    private

    def category_params
      params.require(:category).permit(:name, :content, :slug, :status, :category_id, :thumbnail_id, :published_at, :seo_keyword, :seo_description)
    end

    def set_post
      @category = Category.find_by(id: params[:id])
    end

  end
end
