module Notee
	class Authority < ActiveRecord::Base

		# writer
		# - create: 	posts, categories, images
		# - update: 	my posts, my user
		# - delete: 	my posts (Logical delete)

		# editor
		# - create: 	posts, categories, images
		# - update: 	posts, categories, images, my user
		# - delete: 	posts, categories, images (Logical delete)

		# manager
		# - create: 	posts, categories, images, users
		# - update: 	posts, categories, images, users
		# - delete: 	posts, categories, images, users (Logical delete)

		# suspended
		# all none

		# root
		# - create:   users

		def self.check(crud, class_name)

		end


		private

		# /////////////////////////////////
		# WRITER
		# /////////////////////////////////

		def writer_check

		end

		def editor_check

		end

		def manager_check

		end

		def suspended_check

		end

		def discriminate_role
			token = Token.find_by(access_token: Thread.current[:request].session[:access_token])
			return token.user
		end
	end
end
