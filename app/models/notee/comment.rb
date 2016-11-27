module Notee
  class Comment < ActiveRecord::Base

    # scopes
    scope :trash, -> { where(is_deleted: true) }
    scope :time_limit, -> { where('updated_at <= ?', Time.current - 60*60*24*30) }

    # validates
    validates :post_id, presence: true
    validates :content, presence: true
  end
end
