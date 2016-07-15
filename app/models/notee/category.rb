module Notee
  class Category < ActiveRecord::Base
    before_save :set_slug

    def set_slug
      self.slug = self.name.downcase if self.slug.nil?
    end

  end
end
