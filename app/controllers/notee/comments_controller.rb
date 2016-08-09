require_dependency "notee/application_controller"

module Notee
  class CommentsController < ApplicationController

    def show
      @comments = Comment.where(post_id: params[:id]);
      render json: { status: 'success', comments: @comments}
    end

    # POST /comments
    def create
      @comment = Comment.new(comment_params)

      if @comment.save
        render json: { status: 'success'}
      else
        render json: { status: 'failed'}
      end
    end

    private

      # Only allow a trusted parameter "white list" through.
      def comment_params
        params.require(:comment).permit(:post_id, :content, :name, :email)
      end
  end
end
