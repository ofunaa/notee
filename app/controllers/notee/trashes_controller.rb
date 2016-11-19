require_dependency 'notee/application_controller'

module Notee
	class TrashesController < ApplicationController
		before_action :set_trash, only: [:update]

		def index
			trash_model = get_model
			if @trashes = trash_model.trash
				render json: { status: 'success', trashes: @trashes }
			else
				render json: @trashes.errors, status: 422
			end
		end

		def update
			respond_to do |format|
				if @trash.update(is_delete: false)
					format.json { render json: @trash, status: 200 }
				else
					format.json { render json: @trash.errors, status: :unprocessable_entity }
				end
			end
		end

		def self.cleanup
			Post.trash.time_limit.delete_all
			Category.trash.time_limit.delete_all
			Image.trash.time_limit.delete_all
			User.trash.time_limit.delete_all
			Comment.trash.time_limit.delete_all
		end

		private

		def get_model
			case params[:model]
				when 'posts'
					return Post
				when 'categories'
					return Category
				when 'images'
					return Image
				when 'users'
					return User
				when 'comments'
					return Comment
			end
		end

		def set_trash
			trash_model = get_model
			@trash = trash_model.find_by(id: params[:id])
		end
	end
end
