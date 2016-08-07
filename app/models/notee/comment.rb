module Notee
  class Comment < ApplicationRecord
    validates :post_id, presence: true
    validates :content, presence: true
  end
end
