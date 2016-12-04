# == Schema Information
#
# Table name: notee_posts
#
#  id              :integer          not null, primary key
#  title           :string           default("no title")
#  content         :text
#  slug            :string           default("2016-19-26-54")
#  status          :integer          default(0)
#  category_id     :integer          default(0)
#  thumbnail_id    :integer          default(0)
#  published_at    :datetime         default(Wed, 13 Jul 2016 10:26:54 UTC +00:00)
#  seo_keyword     :string           default("")
#  seo_description :string           default("")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

module Notee
  class Post < ApplicationRecord
    # callbacks
    before_create :set_title
    before_create :set_slug

    before_save :set_published_at

    # relations
    belongs_to :user
    belongs_to :category
    belongs_to :thumbnail, class_name: Notee::Image, foreign_key: 'thumbnail_id'

    # accessors
    attr_accessor :editor_id

    def set_user_id
      self.user_id = Authority.get_user_id
    end

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
