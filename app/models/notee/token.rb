module Notee
  class Token < ActiveRecord::Base

    # callbacks
    before_create :generate_access_token
    before_create :set_expires_at

    # relations
    belongs_to :user

    private

    def generate_access_token
      begin
        self.access_token = SecureRandom.hex
      end while self.class.exists?(access_token: access_token)
    end

    def set_expires_at
      self.expires_at = Time.current + (60 * 60 * 24 * 7) #7日
    end
  end
end
