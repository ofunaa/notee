require_dependency "notee/application_controller"

module Notee
  class PostsController < ApplicationController

    # callbacks
    before_action :set_post, only: [:show, :update, :destroy]
    skip_before_action :restrict_access_json, only: [:notee]
    before_action :restrict_access, only: [:notee]


    def notee
    end

    # GET /posts
    def index
      @posts = Post.all
      render json: { status: 'success', posts: @posts}
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
      @post.destroy
      render json: { status: 'success'}
    end

    private

      def set_post
        @post = Post.find_by(id: params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def post_params
        params.require(:post).permit(:title, :content, :slug, :status, :category_id, :thumbnail_id, :published_at, :seo_keyword, :seo_description)
      end

      def restrict_access
        # authenticate_or_request_with_http_token do |token, options|
        #   Token.exists?(access_token: token)
        # end

        unless Token.exists?(access_token: session[:access_token])
          redirect_to new_token_path and return
        end

      end
  end
end
