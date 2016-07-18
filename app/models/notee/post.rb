module Notee
  class Post < ActiveRecord::Base

    # callbacks
    before_create :set_title
    before_create :set_slug

    # relations
    belongs_to :category
    belongs_to :thumbnail, :class_name => Notee::Image, :foreign_key => 'thumbnail_id'

    def set_title
      self.title = "no_title#{Notee::Post.count}" unless self.title.present?
    end

    def set_slug
      self.slug = self.title.downcase unless self.slug.present?
    end
  end
end
