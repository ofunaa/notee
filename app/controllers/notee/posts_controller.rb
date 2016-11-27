require_dependency 'notee/application_controller'

module Notee
  class PostsController < ApplicationController
    # callbacks
    before_action :set_post, only: [:show, :update, :destroy]

    # GET /posts
    def index
      @posts = Post.where(is_delete: false).order(updated_at: :desc)
      render json: { status: 'success', posts: @posts }
    end

    # GET /posts/1
    def show
      render json: { status: 'success', post: @post}
    end

    # POST /posts
    def create
      @post = Post.new(post_params)
      respond_to do |format|
        if @post.save
          format.json { render json: @post, status: 200 }
        else
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /posts/1
    def update
      post_params[:user_id] = @post.user_id
      respond_to do |format|
        if @post.update(post_params)
          format.json { render json: @post, status: 200 }
        else
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /posts/1
    def destroy
      respond_to do |format|
        if @post.update(is_delete: true)
          format.json { render json: @post, status: 200 }
        else
          format.json { render json: @post.errors, status: :internal_server_error }
        end
      end
    end

    private

    def set_post
      @post = Post.find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:title, :content, :slug, :status, :category_id, :thumbnail_id, :published_at, :seo_keyword, :seo_description, :secret_published_password)
    end
  end
end
