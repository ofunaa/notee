require 'notee'

# Recommendation using .env

Notee.configure do |config|

  # root-user
  config.notee_id = "hogehoge"        # ENV['NOTEE_ID']
  config.notee_password = "hogehoge"  # ENV['NOTEE_PASSWORD']

  # recaptcha
  config.recaptcha_key = "hogehoge"         # ENV['RECAPTCHA_KEY']
  config.recaptcha_secret_key = "hogehoge"  # ENV['RECAPTCHA_SECRET_KEY']

  # blog
  config.blog_meta = {
      title: "Notee",
      url: "http://hogehoge.com",
      keyword: "hoge, hoge, hoge",
      description: "【react&rails】notee is creating CMS(blog) app by only one command.",
      og_image: "http://hogehoge.com/hoge.png",
      twitter_id: "@hogehoge"
  }

  # google-analytics
  config.google_analytics = "hogehogehogehoge"
end
