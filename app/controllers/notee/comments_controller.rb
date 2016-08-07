require_dependency "notee/application_controller"

module Notee
  class CommentsController < ApplicationController

    # POST /comments
    def create
      @comment = Comment.new(comment_params)

      if @comment.save
        render json: { status: 'success', comment: @comment}
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
