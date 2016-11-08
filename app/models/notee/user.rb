module Notee
  class User < ApplicationRecord

    ENCRYPT_KEY = 'n1o2t3e4e4_5u5s1e2r3'

    # enums
    enum role: { writer: 0, editor: 10, manager: 20, suspended: 99, root: 9999 }

    # accessors
    attr_accessor :file
    attr_accessor :password
    attr_accessor :password_confirm
    attr_accessor :editor_id

    # callback
    before_save :confirm_password
    before_save :set_salt
    before_save :encrypt_password
    before_save :manage_profile_img

    def self.sign_in(name_or_email, password)
      user = find_by(name: name_or_email)
      user = find_by(email: name_or_email) unless user
      return false unless user
      return false unless user.encrypted_password == encrypt(password)

      user
    end

    def confirm_password
      return false unless password == password_confirm
    end

    def set_salt
      self.salt = OpenSSL::Random.random_bytes(8)
    end

    def encrypt_password
      self.encrypted_password = encrypt(password)
    end

    def manage_profile_img
      return unless file.present?
      return if User.exists?(profile_img: file)

      image_dir = Rails.root.to_s + '/public/notee/profile/'
      FileUtils.mkdir_p(image_dir) unless FileTest.exist?(image_dir)
      image_name = Time.now.strftime('%Y%m%d%H%M%S') + '--' + SecureRandom.uuid + '.jpg'
      transaction do
        open(image_dir + '/' + image_name, 'wb') do |output|
          output.write(file.read)
        end
      end
      self.profile_img = image_name
    end

    def self.encrypt(password)
      enc = OpenSSL::Cipher::Cipher.new('AES-256-CBC')
      enc.encrypt
      enc.pkcs5_keyivgen(ENCRYPT_KEY, self.salt)
      enc.update( password ) + enc.final
    end

    def self.decrypt(password)
      enc = OpenSSL::Cipher::Cipher.new('AES-256-CBC')
      enc.decrypt
      enc.pkcs5_keyivgen(ENCRYPT_KEY, self.salt)
      enc.update( password ) + enc.final
    end

    def self.root_user_setting
      unless User.exists?(id: 0)
        new_user = User.new(id: 0, name: "root", email: "root", password: SecureRandom.hex, role: 9999)
        new_user.save
      end
    end
  end
end
