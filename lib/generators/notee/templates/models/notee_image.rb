class NoteeImage < ActiveRecord::Base
  mount_uploader :content, NoteeImageUploader
end
