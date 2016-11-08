module Notee
	class Authority
		include ActiveModel::Model

		class AuthorityError < StandardError; end
		class << self

			def check(crud, new_model_obj)
				role = get_role

				case role
					when 'writer' then
						writer(crud, new_model_obj)
					when 'editor' then
						editor(crud, new_model_obj)
					when 'manager' then
						manager(crud, new_model_obj)
					when 'suspended' then
						suspended
					when 'root' then
						root_user(crud, new_model_obj)
					else
				end
			end

			private

			# /////////////////////////////////
			# WRITER
			# /////////////////////////////////

			# - create: 	posts, categories, images
			# - update: 	my posts, my user, categories, images
			# - delete: 	my posts (Logical delete)

			def writer(crud, new_model_obj)
				case crud
					when 'create' then
						writer_create(new_model_obj)
					when 'update' then
						writer_update(new_model_obj)
					when 'destroy' then
						writer_destroy(new_model_obj)
					else
				end
			end

			def writer_create(new_model_obj)
				case new_model_obj.class.name
					when /Post/ then
						# success
						logger.debug("Writer create a post")
					when /Category/ then
						# success
						logger.debug("Writer create a category")
					when /Image/ then
						# success
						logger.debug("Writer create a image")
					when /User/ then
						# error
						raise AuthorityError, 'Writer can not create User'
					else
				end
			end

			def writer_update(new_model_obj)
				case new_model_obj.class.name
					when /Post/ then
						# error
						raise AuthorityError, 'Writer can update only my Post' unless get_user_id == new_model_obj.user_id

						# success
						logger.debug("Writer update my post")
					when /Category/ then
						# success
						logger.debug("Writer update a category")
					when /Image/ then
						# success
						logger.debug("Writer update a image")
					when /User/ then
						# error
						raise AuthorityError, 'Writer can update only my Post' unless get_user_id == new_model_obj.id

						# success
						logger.debug("Writer update my user")
					else

				end
			end

			def writer_destroy(new_model_obj)
				case new_model_obj.class.name
					when /Post/ then
						# error
						raise AuthorityError, 'Writer can destroy only my Post' unless get_user_id == new_model_obj.user_id

						# success
						logger.debug("Writer destroy my post")
					when /Category/ then
						# error
						raise AuthorityError, 'Writer can not destroy Category'
					when /Image/ then
						# error
						raise AuthorityError, 'Writer can not destroy Image'
					when /User/ then
						# error
						raise AuthorityError, 'Writer can not destroy User'
					else

				end
			end

			# /////////////////////////////////
			# EDITOR
			# /////////////////////////////////

			# - create: 	posts, categories, images
			# - update: 	posts, categories, images, my user
			# - delete: 	posts, categories, images (Logical delete)

			def editor(crud, new_model_obj)
				case crud
					when 'create' then
						editor_create(new_model_obj)
					when 'update' then
						editor_update(new_model_obj)
					when 'destroy' then
						editor_destroy(new_model_obj)
					else

				end
			end

			def editor_create(new_model_obj)
				case new_model_obj.class.name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			def editor_update(new_model_obj)
				case new_model_obj.class.name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			def editor_destroy(new_model_obj)
				case new_model_obj.class.name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			# /////////////////////////////////
			# MANAGER
			# /////////////////////////////////

			# - create: 	posts, categories, images, users
			# - update: 	posts, categories, images, users
			# - delete: 	posts, categories, images, users (Logical delete)

			def manager(crud, new_model_obj)
				case crud
					when 'create' then
						manager_create(new_model_obj)
					when 'update' then
						manager_update(new_model_obj)
					when 'destroy' then
						manager_destroy(new_model_obj)
					else

				end
			end

			def manager_create(new_model_obj)
				case new_model_obj.class.name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			def manager_update(new_model_obj)
				case new_model_obj.class.name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			def manager_destroy(new_model_obj)
				case new_model_obj.class.name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			# /////////////////////////////////
			# SUSPENDED
			# /////////////////////////////////

			# suspended
			# all none

			def suspended
				# error
				raise AuthorityError, 'This User is Suspended..'
			end

			# /////////////////////////////////
			# ROOT
			# /////////////////////////////////

			# root
			# - create:   users

			def root_user(crud, new_model_obj)
				case crud
					when 'create' then
						case new_model_obj.class.name
							when /User/ then
								# success
								logger.debug("Root_user create a user")
							else
								# error
								raise AuthorityError, 'Root user only create User'
						end
					else
						# error
						raise AuthorityError, 'Root user only create User'
				end
			end

			# //////////////////////////////////////////////////////////

			def get_role
				token = Token.find_by(access_token: Thread.current[:request].session[:access_token])
				return token.user.role
			end

			def get_user_id
				token = Token.find_by(access_token: Thread.current[:request].session[:access_token])
				return token.user.id
			end
		end
	end
end
