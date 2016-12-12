require_dependency 'notee/application_controller'

module Notee
  class CommentsController < ApplicationController
    before_action :set_comment, only: [:update, :destroy]

    def index
      comments = Comment.where(is_deleted: false).order(updated_at: :desc)
      render json: { status: 'success', comments: comments }
    end

    def show
      @comments = Comment.where(post_id: params[:id])
      render json: { status: 'success', comments: @comments }
    end

    def create
      @comment = Comment.new(comment_params)
      if @comment.save
        render json: { status: 'success' }
      else
        render json: { status: 'failed' }
      end
    end

    def update
      respond_to do |format|
        if @comment.update(is_hidden: !@comment.is_hidden)
          format.json { render json: @comment, status: 200 }
        else
          format.json { render json: @comment.errors, status: :unprocessable_entity }
        end
      end
    end

    def destroy
      respond_to do |format|
        if @comment.update(is_deleted: true)
          format.json { render json: @comment, status: 200 }
        else
          format.json { render json: @comment.errors, status: :internal_server_error }
        end
      end
    end

    private

    def set_comment
      @comment = Comment.find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.require(:comments).permit(:post_id, :content, :name, :email)
    end
  end
end
