module Notee
  class Category < ActiveRecord::Base

    # callbacks
    before_save :set_slug

    # relations
    has_many :children, class_name: Notee::Category, :foreign_key => 'parent_id', dependent: :destroy

    def set_slug
      self.slug = self.name.downcase unless self.slug.present?
    end

  end
end
