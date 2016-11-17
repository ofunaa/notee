require_dependency 'notee/application_controller'

module Notee
	class TrashesController < ApplicationController
		before_action :set_trash, only: [:update]

		def index
			trash_model = get_model
			if @trashes = trash_model.where(is_delete: true)
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
			@trash = get_model.find_by(id: params[:id])
		end
	end
end
