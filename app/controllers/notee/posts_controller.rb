require_dependency "notee/application_controller"

module Notee
  class PostsController < ApplicationController
    before_action :set_post, only: [:show, :edit, :update, :destroy]

    skip_before_filter :restrict_access_json, only: [:new]
    before_filter :restrict_access, only: [:new]

    # GET /posts
    def index
      @posts = Post.all
    end

    # GET /posts/1
    def show
    end

    # GET /posts/new
    def new
      @notee_image = Image.all.last
    end

    # GET /posts/1/edit
    def edit
    end

    # POST /posts
    def create
      @post = Post.new(post_params)

      if @post.save
        redirect_to @post, notice: 'Post was successfully created.'
      else
        render :new
      end
    end

    # PATCH/PUT /posts/1
    def update
      if @post.update(post_params)
        redirect_to @post, notice: 'Post was successfully updated.'
      else
        render :edit
      end
    end

    # DELETE /posts/1
    def destroy
      @post.destroy
      redirect_to posts_url, notice: 'Post was successfully destroyed.'
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
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
