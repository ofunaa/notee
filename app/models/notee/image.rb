require 'paperclip'

module Notee
  class Image < ActiveRecord::Base
    Paperclip::Railtie.insert

    attr_accessor :content

    has_attached_file :content, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
    validates_attachment_content_type :content, :content_type => /\Aimage\/.*\Z/

  end
end
