module Notee
  module Configuration

    VALID_OPTIONS_KEY = [
      :notee_id,
      :notee_password
    ].freeze

    DEFAULT_NOTEE_ID = nil
    DEFAULT_NOTEE_PASSWORD = nil

    attr_accessor *VALID_OPTIONS_KEY

    def configure
      yield self
    end

    def self.extended(base)
      base.reset
    end

    def reset
      self.notee_id = DEFAULT_NOTEE_ID
      self.notee_password = DEFAULT_NOTEE_PASSWORD
    end

  end
end
