module Notee
  class Post < ActiveRecord::Base
    before_create :set_title
    before_create :set_slug

    def set_title
      self.title = "no_title#{Notee::Post.count}" unless self.title.present?
    end

    def set_slug
      self.slug = self.title.downcase unless self.slug.present?
    end
  end
end
