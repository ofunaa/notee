module Notee
  class Comment < ActiveRecord::Base
    validates :post_id, presence: true
    validates :content, presence: true
  end
end
