
require_dependency "notee/application_controller"

module Notee
  class CategoriesController < ApplicationController

    def index
    end

    def show
    end

    def create
      @category = Post.new(category_params)

      if @category.save
        redirect_to @category, notice: 'Post was successfully created.'
      else
        render :new
      end
    end

    def update
      if @category.update(category_params)
        redirect_to @category, notice: 'Post was successfully updated.'
      else
        render :edit
      end
    end

    def destroy
      @category.destroy
      redirect_to categories_url, notice: 'Post was successfully destroyed.'
    end

    private

    def category_params
      params.require(:category).permit(:title, :content, :slug, :status, :category_id, :thumbnail_id, :published_at, :seo_keyword, :seo_description)
    end
  end
end
