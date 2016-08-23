module Notee
  class User < ActiveRecord::Base

		# enums
		enum role: { writer: 0, editor: 10, manager: 20, suspended: 99 }

    # writer
		# - create: 	posts, categories, images
		#	- update: 	my posts, my user
		#	- delete: 	my posts (Logical delete)

		# editor
		# - create:		posts, categories, images
		#	- update:		posts, categories, images, my user
		#	- delete:		posts, categories, images (Logical delete)

		# manager
		# - create:		posts, categories, images, users
		#	- update:		posts, categories, images, users
		#	- delete:		posts, categories, images, users (Logical delete)

		# suspended			# root
		# all none			# all


  	# accessors
  	attr_accessor :password

  	# callback
  	before_save :encrypt_password


  	def sign_in(name_or_email, password)
  	  user = self.find_by(name: name_or_email)
  	  user = self.find_by(email: name_or_email) unless user
  	  return false unless user
	  	return false unless user.encrypted_password == encrypt(password)
  	
  	  return user
  	end


  	def encrypt(password)
  	  return OpenSSL::Digest::MD5.hexdigest(password)
  	end


  	def encrypt_password
  	  self.encrypted_password = encrypt(self.password)
  	end

	end
end
