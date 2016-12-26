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
    before_save :restrict_set_parent_id
    before_save :set_slug
    before_update :protect_default, if: :is_destroy?
    before_update :delete_post_category_id, if: :is_destroy?
    before_update :delete_parent_id, if: :is_destroy?

    # relations
    has_many :posts
    has_many :children, class_name: Notee::Category, foreign_key: 'parent_id'


    def restrict_set_parent_id
      raise if restrict_id_array(self.id).include?(self.parent_id)
    end

    def restrict_id_array(cate_id)
      cate = Category.find(cate_id)
      arr = [cate.id]
      return arr if cate.children.nil?

      recursive_children_loop(arr, cate.children)
      arr
    end

    def recursive_children_loop(arr, childs_arr)
      childs_arr.each do |category|
        if category.children.present?
          recursive_children_loop(arr, category.children)
        end

        arr.push(category.id)
      end
    end

    def set_slug
      self.slug = self.name.downcase unless self.slug.present?
    end

    def protect_default
      raise if self.id == 1
    end

    def delete_parent_id
      return false if self.children.nil?

      skip_callback_block(Category) do
        self.children.each do |child|
          child.update(parent_id: nil)
        end
      end
    end

    def delete_post_category_id
      return false if self.posts.nil?

      skip_callback_block(Category) do
        self.posts.each do |post|
          post.update(category_id: 1)
        end
      end
    end



  end
end
