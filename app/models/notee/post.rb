module Notee
  class Post < ActiveRecord::Base

    # callbacks
    before_create :set_title
    before_create :set_slug
    before_save :set_published_at

    # relations
    belongs_to :category
    belongs_to :thumbnail, :class_name => Notee::Image, :foreign_key => 'thumbnail_id'

    private
    def set_title
      self.title = "no_title#{Notee::Post.count}" unless self.title.present?
    end

    def set_slug
      self.slug = self.title.downcase unless self.slug.present?
    end

    def set_published_at
      return if self.published_at.present?
      if self.status != 0
        self.published_at = Time.now
      end
    end
  end
end
