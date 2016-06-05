require_dependency "notee/application_controller"

module Notee
  class NoteePostsController < ApplicationController
    before_action :set_notee_post, only: [:show, :edit, :update, :destroy]

    # GET /notee_posts
    def index
      @notee_posts = NoteePost.all
    end

    # GET /notee_posts/1
    def show
    end

    # GET /notee_posts/new
    def new
      @notee_post = NoteePost.new
    end

    # GET /notee_posts/1/edit
    def edit
    end

    # POST /notee_posts
    def create
      @notee_post = NoteePost.new(notee_post_params)

      if @notee_post.save
        redirect_to @notee_post, notice: 'Notee post was successfully created.'
      else
        render :new
      end
    end

    # PATCH/PUT /notee_posts/1
    def update
      if @notee_post.update(notee_post_params)
        redirect_to @notee_post, notice: 'Notee post was successfully updated.'
      else
        render :edit
      end
    end

    # DELETE /notee_posts/1
    def destroy
      @notee_post.destroy
      redirect_to notee_posts_url, notice: 'Notee post was successfully destroyed.'
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_notee_post
        @notee_post = NoteePost.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def notee_post_params
        params.require(:notee_post).permit(:title, :content, :slug, :status, :category_id, :thumbnail_id, :published_at, :seo_keyword, :seo_description)
      end
  end
end
