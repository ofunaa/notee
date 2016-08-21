
require_dependency "notee/application_controller"

module Notee
  class UsersController < ApplicationController

    # callbacks
    before_action :set_user, only: [:show, :update, :destroy]

    # GET /users
    def index
      @users = User.all.order(updated_at: :desc)
      render json: { status: 'success', users: @users}
    end

    # GET /posts/1
    def show
      render json: { status: 'success', user: @user}
    end

    # POST /posts
    def create
      @user = User.new(user_params)
      respond_to do |format|
        if @user.save
          format.json { render json: @user, status: 200 }
        else
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /posts/1
    def update
      respond_to do |format|
        if @user.update(user_params)
          format.json { render json: @user, status: 200 }
        else
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /posts/1
    def destroy
      @user.destroy
      render json: { status: 'success'}
    end

    private

      def set_user
        @user = User.find_by(id: params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def post_params
        params.require(:user).permit(:title, :content, :slug, :status, :category_id, :thumbnail_id, :published_at, :seo_keyword, :seo_description, :secret_published_password)
      end
  end
end
