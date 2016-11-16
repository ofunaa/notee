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
  end
end
