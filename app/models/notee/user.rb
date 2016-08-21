module Notee
  class User < ApplicationRecord

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
