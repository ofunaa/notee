module Notee
  class ApplicationRecord < ActiveRecord::Base
    self.abstract_class = true

    # scopes
    scope :trash, -> { where(is_delete: true) }
    scope :time_limit, -> { where('updated_at <= ?', Time.current - 60*60*24*30) }

    # authority check
    before_create :create_authority
    before_update :update_authority
    before_destroy :destroy_authority

    def create_authority
      Authority.check('create', self)
    end

    def update_authority
      Authority.check('update', self)
    end

    def destroy_authority
      Authority.check('destroy', self)
    end
  end
end
