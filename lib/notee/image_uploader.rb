require "carrierwave"

module Notee
  class ImageUploader < CarrierWave::Uploader::Base
    include CarrierWave::RMagick

    process :convert => 'jpg'

    def store_dir
      "notee_uploads/#{mounted_as}"
    end

    version :thumb do
      process :resize_to_fit => [400, 200]
    end

    def extension_white_list
      %w(jpg jpeg gif png)
    end

    def filename
      Time.now.strftime('%Y%m%d%H%M%S') + original_filename + '.jpg' if original_filename.present?
    end

  end
end
