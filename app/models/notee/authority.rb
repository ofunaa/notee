module Notee
	class Authority < ActiveRecord::Base

		class AuthorityError < StandardError; end
		class << self

			def check(crud, class_name)
				role = get_role

				case role
					when 'writer' then
						writer(crud, class_name)
					when 'editor' then
						editor(crud, class_name)
					when 'manager' then
						manager(crud, class_name)
					when 'suspended' then
						suspended
					when 'root' then
						root_user(crud, class_name)
					else
				end
			end

			private

			# /////////////////////////////////
			# WRITER
			# /////////////////////////////////

			# - create: 	posts, categories, images
			# - update: 	my posts, my user
			# - delete: 	my posts (Logical delete)

			def writer(crud, class_name)
				case crud
					when 'create' then
						writer_create(class_name)
					when 'update' then
						writer_update(class_name)
					when 'destroy' then
						writer_destroy(class_name)
					else
				end
			end

			def writer_create(class_name)
				case class_name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			def writer_update(class_name)
				case class_name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			def writer_destroy(class_name)
				case class_name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			# /////////////////////////////////
			# EDITOR
			# /////////////////////////////////

			# - create: 	posts, categories, images
			# - update: 	posts, categories, images, my user
			# - delete: 	posts, categories, images (Logical delete)

			def editor(crud, class_name)
				case crud
					when 'create' then
						editor_create(class_name)
					when 'update' then
						editor_update(class_name)
					when 'destroy' then
						editor_destroy(class_name)
					else

				end
			end

			def editor_create(class_name)
				case class_name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			def editor_update(class_name)
				case class_name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			def editor_destroy(class_name)
				case class_name
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

			def manager(crud, class_name)
				case crud
					when 'create' then
						manager_create(class_name)
					when 'update' then
						manager_update(class_name)
					when 'destroy' then
						manager_destroy(class_name)
					else

				end
			end

			def manager_create(class_name)
				case class_name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			def manager_update(class_name)
				case class_name
					when /Post/ then

					when /Category/ then

					when /Image/ then

					when /User/ then

					else

				end
			end

			def manager_destroy(class_name)
				case class_name
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

			end

			# /////////////////////////////////
			# ROOT
			# /////////////////////////////////

			# root
			# - create:   users

			def root_user(crud, class_name)
				case crud
					when 'create' then
						case class_name
							when /User/ then
								# success
								logger.debug("Root_user create a User")
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
		end
	end
end
