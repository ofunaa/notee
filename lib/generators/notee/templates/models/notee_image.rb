class NoteeImage < ActiveRecord::Base
  mount_uploader :content, Notee::ImageUploader
end
