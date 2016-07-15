module Notee
  class Category < ActiveRecord::Base
    before_save :set_slug

    def set_slug
      self.slug = self.name.downcase
    end

  end
end
