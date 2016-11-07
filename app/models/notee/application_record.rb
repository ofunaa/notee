module Notee
  class ApplicationRecord < ActiveRecord::Base
    self.abstract_class = true

    # authority check
    before_create :create_authority
    before_update :update_authority
    before_destroy :destroy_authority

    def create_authority
      Authority.check('create', self.class.name)
    end

    def update_authority
      Authority.check('update', self.class.name)
    end

    def destroy_authority
      Authority.check('destroy', self.class.name)
    end
  end
end
