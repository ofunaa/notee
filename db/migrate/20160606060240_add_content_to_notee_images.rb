require 'paperclip'

class AddContentToNoteeImages < ActiveRecord::Migration

  Paperclip::Railtie.insert

  def self.up
    add_attachment :notee_images, :content
  end

  def self.down
    remove_attachment :notee_images, :content
  end
end
