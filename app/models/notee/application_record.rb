module Notee
  class ApplicationRecord < ActiveRecord::Base
    self.abstract_class = true

    # scopes
    scope :trash, -> { where(is_deleted: true) }
    scope :time_limit, -> { where('updated_at <= ?', Time.current - 60*60*24*30) }

    # authority check
    before_create :create_authority
    before_update :update_authority
    before_update :destroy_authority, if: :is_destroy?

    def create_authority
      Authority.check('create', self)
    end

    def update_authority
      Authority.check('update', self)
    end

    def destroy_authority
      Authority.check('destroy', self)
    end

    def is_destroy?
      return true if self.is_deleted == true
      false
    end
  end
end
