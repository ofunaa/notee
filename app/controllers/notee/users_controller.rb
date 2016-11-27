
require_dependency 'notee/application_controller'

module Notee
  class UsersController < ApplicationController
    
    # callbacks
    before_action :set_user, only: [:show, :update, :destroy]
    before_action :convert_from_string_to_int, only: [:create, :update]

    # GET /users
    def index
      @users = User.where(is_deleted: false).order(updated_at: :desc)
      render json: { status: 'success', users: @users }
    end

    # GET /posts/1
    def show
      render json: { status: 'success', user: @user }
    end

    def mypage
      @user = Token.find_by(access_token: session[:access_token]).user
      render json: { status: 'success', user: @user }
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

    def update_password
      @user = Token.find_by(access_token: session[:access_token]).user
      respond_to do |format|
        if @user.update_password(user_params)
          format.json { render json: @user, status: 200 }
        else
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /posts/1
    def destroy
      respond_to do |format|
        if @user.update(is_deleted: true)
          format.json { render json: @user, status: 200 }
        else
          format.json { render json: @user.errors, status: :internal_server_error }
        end
      end
    end

    private

    def set_user
      @user = User.find_by(id: params[:id])
    end

    def convert_from_string_to_int
      params[:user][:role] = params[:user][:role].to_i
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email, :now_password, :password, :password_confirm, :profile, :profile_img, :role, :file)
    end
  end
end
