# == Schema Information
#
# Table name: notee_categories
#
#  id         :integer          not null, primary key
#  name       :string           default("category_name"), not null
#  slug       :string           default("2016-19-26-54"), not null
#  parent_id  :integer
#  status     :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Notee
  class Category < ApplicationRecord

    # callbacks
    before_save :set_slug
    before_save :protect_default

    # relations
    has_many :children, class_name: Notee::Category, foreign_key: 'parent_id', dependent: :destroy

    private

    def set_slug
      self.slug = self.name.downcase unless self.slug.present?
    end

    def protect_default
      return false if self.id == 1
    end

    def self.before_destroy_parent(id)
      @child_with_parent =Category.where(parent_id: id)

      Category.skip_callback(:update, :before, :update_authority)
      Category.skip_callback(:update, :before, :destroy_authority)
      @child_with_parent.each do |child|
        child.update(parent_id: nil)
      end
      Category.set_callback(:update, :before, :update_authority)
      Category.set_callback(:update, :before, :destroy_authority)
    end
  end
end
