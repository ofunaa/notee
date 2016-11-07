# == Schema Information
#
# Table name: notee_images
#
#  id         :integer          not null, primary key
#  content    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'securerandom'

module Notee
  class Image < ApplicationRecord
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
      transaction do
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
