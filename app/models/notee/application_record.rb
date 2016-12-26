module Notee
  class ApplicationRecord < ActiveRecord::Base
    self.abstract_class = true

    # scopes
    scope :trash, -> { where(is_deleted: true) }
    scope :not_trash, -> { where(is_deleted: false) }
    scope :time_limit, -> { where('updated_at <= ?', Time.current - 60*60*24*30) }

    # authority check
    before_create :create_authority
    before_update :update_authority, unless: :is_destroy?
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

    def skip_callback_block(model)

      return unless block_given?

      model.skip_callback(:create, :before, :create_authority, raise: false)
      model.skip_callback(:update, :before, :update_authority, raise: false)
      model.skip_callback(:update, :before, :destroy_authority, raise: false)

      yield

      model.set_callback(:create, :before, :create_authority, raise: false)
      model.set_callback(:update, :before, :update_authority, raise: false)
      model.set_callback(:update, :before, :destroy_authority, raise: false)
    end
  end
end
