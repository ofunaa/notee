require 'notee'

# Recommendation using .env

Notee.configure do |config|

  # root-user
  config.notee_id = "hogehoge"
  config.notee_password = "hogehoge"

  # recaptcha
  config.recaptcha_key = "hogehoge"
  config.recaptcha_secret_key = "hogehoge"

  # blog
  config.blog_meta = {
      title: "Notee",
      url: "http://hogehoge.com",
      keyword: "hoge, hoge, hoge",
      description: "【react&rails】notee is creating CMS(blog) app by only one command.",
      og_image: "http://hogehoge.com/hoge.png"
  }

  # google-analytics
  config.google_analytics = "hogehogehogehoge"
end
