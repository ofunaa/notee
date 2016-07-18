require 'securerandom'

module Notee
  class Image < ActiveRecord::Base

    # accessors
    attr_accessor :file

    # callbacks
    before_save :manage_image
    before_destroy :protect_default

    private
    def manage_image
      return unless self.file

      image_dir = Rails.root.to_s + "/public/notee"
      FileUtils.mkdir_p(image_dir) unless FileTest.exist?(image_dir)
      image_name = Time.now.strftime('%Y%m%d%H%M%S') + '--' + SecureRandom.uuid + '.jpg'
      self.transaction do
        open(image_dir + "/" + image_name, 'wb') do |output|
          output.write(self.file.read)
        end
        self.content = image_name
      end
    end

    def protect_default
      return false if self.id == 1
    end

  end
end
