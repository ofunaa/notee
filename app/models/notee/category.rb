module Notee
  class Category < ActiveRecord::Base
    # callbacks
    before_save :set_slug
    before_destroy :protect_default

    # relations
    has_many :children, class_name: Notee::Category, foreign_key: 'parent_id', dependent: :destroy

    private

    def set_slug
      self.slug = self.name.downcase unless self.slug.present?
    end

    def protect_default
      return false if self.id == 1
    end
  end
end
