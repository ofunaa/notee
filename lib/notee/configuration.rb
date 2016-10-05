module Notee
  module Configuration

    VALID_OPTIONS_KEY = [
      :notee_id,
      :notee_password,
      :recaptcha_key,
      :recaptcha_secret_key,
      :blog_title,
      :blog_url,
      :blog_description,
      :blog_keywords,
      :blog_og_image,
      :google_analytics
    ].freeze

    # root-user
    DEFAULT_NOTEE_ID = nil
    DEFAULT_NOTEE_PASSWORD = nil

    # recaptcha
    DEFAULT_RECAPTCHA_KEY = nil
    DEFAULT_RECAPTCHA_SECRET_KEY = nil

    # blog
    DEFAULT_BLOG_TITLE = nil
    DEFAULT_BLOG_URL = nil
    DEFAULT_BLOG_DESCRIPTION = nil
    DEFAULT_BLOG_KEYWORDS = nil
    DEFAULT_BLOG_OG_IMAGE = nil

    # google-analytics
    DEFAULT_GOOGLE_ANALYTICS = nil


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
      self.recaptcha_key = DEFAULT_RECAPTCHA_KEY
      self.recaptcha_secret_key = DEFAULT_RECAPTCHA_SECRET_KEY
    end

  end
end
