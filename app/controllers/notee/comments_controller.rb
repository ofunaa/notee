require_dependency "notee/application_controller"

module Notee
  class CommentsController < ApplicationController

    before_action :set_comment, only: [:update, :destroy]

    def index
      comments = Comment.all.order(updated_at: :desc)
      render json: { status: 'success', comments: comments}
    end

    def show
      @comments = Comment.where(post_id: params[:id]);
      render json: { status: 'success', comments: @comments}
    end

    def create
      @comment = Comment.new(comment_params)
      if @comment.save
        render json: { status: 'success'}
      else
        render json: { status: 'failed'}
      end
    end

    def update
      respond_to do |format|
        if @comment.update(post_params)
          format.json { render json: @comment, status: 200 }
        else
          format.json { render json: @comment.errors, status: :unprocessable_entity }
        end
      end
    end

    def destroy
      @comment.destroy
      render json: { status: 'success'}
    end

    private

    def set_comment
      @comment = Comment.find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.require(:comment).permit(:post_id, :content, :name, :email)
    end
  end
end
