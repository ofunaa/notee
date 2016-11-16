require_dependency 'notee/application_controller'

module Notee
	class TrashesController < ApplicationController
		def index
			trash_model = get_model

			if @trashes = trash_model.where(is_delete: true)
				render json: { status: 'success', trashes: @trashes }
			else
				render json: @trashes.errors, status: 422
			end

		end

		def get_model
			case params[:model]
				when 'post'
					return Post
				when 'category'
					return Category
				when 'image'
					return Image
				when 'user'
					return User
				when 'comment'
					return Comment
			end
		end
	end
end
