module Notee
  class User < ApplicationRecord

    # enums
    enum role: { writer: 0, editor: 10, manager: 20, root: 9999 }

    # accessors
    attr_accessor :file
    attr_accessor :now_password
    attr_accessor :password
    attr_accessor :password_confirm
    attr_accessor :editor_id

    # callback
    before_create :confirm_password
    before_create :encrypt_password
    before_update :confirm_password, if: :has_password?  # 1
    before_update :encrypt_password, if: :has_password?  # 2
    before_update :set_user_id_to_root, if: :is_destroy?
    before_update :restrict_change_own_role
    before_save :manage_profile_img

    # constants
    SECURE = 'SOFHGPOIJERPGOKSPDO2SPTI4RJ6POIFDJVS7ETJ1EITJHSPEKMVOEIGU'
    CIPHER = 'aes-256-cbc'

    def update_password(params)
      return false unless params[:now_password] == User.decrypt(self.encrypted_password)
      return false unless params[:password] == params[:password_confirm]
      self.update(params)
    end

    def encrypt(password)
      crypt = ActiveSupport::MessageEncryptor.new(SECURE, CIPHER)
      crypt.encrypt_and_sign(password)
    end

    def self.decrypt(password)
      crypt = ActiveSupport::MessageEncryptor.new(SECURE, CIPHER)
      crypt.decrypt_and_verify(password)
    end

    def self.sign_in(name_or_email, password)

      # root-user login
      if Notee.notee_id == name_or_email && Notee.notee_password == password
        return root_user_setting
      end

      # other-user login
      user = not_trash.find_by(name: name_or_email)
      user = not_trash.find_by(email: name_or_email) unless user
      return false unless user
      return false if user.id == 0 # root_user
      return false unless password == decrypt(user.encrypted_password)

      user_setting(user)
    end

    def self.user_setting(user)
      if token = Token.create!(user_id: user.id)
        Thread.current[:request].session[:access_token] = token.access_token
      end
    end

    def self.root_user_setting
      unless User.exists?(id: 0)
        User.skip_callback(:create, :before, :create_authority)
        User.create(id: 0, name: Notee.notee_id, email: "root", password: SecureRandom.hex, role: 9999)
        User.set_callback(:create, :before, :create_authority)
      end

      if token = Token.create!(user_id: 0)
        Thread.current[:request].session[:access_token] = token.access_token
      end
    end

    private

    def restrict_change_own_role
      now_user = Token.find_by_access_token(Thread.current[:request].session[:access_token]).user
      self.role = now_user.role if self.id == now_user.id
    end

    def manage_profile_img
      return unless self.file.present?

      image_dir = Rails.root.to_s + "/public/notee/profile/"
      FileUtils.mkdir_p(image_dir) unless FileTest.exist?(image_dir)
      image_name = Time.now.strftime('%Y%m%d%H%M%S') + '--' + SecureRandom.uuid + '.jpg'

      return if User.exists?(profile_img: image_name)

      transaction do
        open(image_dir + "/" + image_name, 'wb') do |output|
          output.write(self.file.read)
        end
        self.profile_img = image_name
      end
    end

    def set_user_id_to_root
      posts = Post.where(user_id: self.id)

      Post.skip_callback(:update, :before, :destroy_authority)
      Post.transaction do
        posts.each do |post|
          post.update(user_id: 0)
        end
      end
      Post.set_callback(:update, :before, :destroy_authority)

    end

    def confirm_password
      return false unless password == password_confirm
    end

    def encrypt_password
      self.encrypted_password = encrypt(self.password)
    end

    def has_password?
      self.password.present?
    end
  end
end
