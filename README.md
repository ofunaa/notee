# Notee

Notee is creating blog gem by only one command.

## Installation

```ruby
gem 'notee'
```
    $ bundle install
    $ bundle exec rake notee:start
    
## Setting

update for your setting in config/initializers/notee.rb

Recommendation using .env

```rb
require 'notee'

# Recommendation using .env for manage id & password

Notee.configure do |config|

  # root-user
  config.notee_id = "your_name"
  config.notee_password = "your_password"

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

```

## Start

    $ bundle exec rake db:migrate
    $ bundle exec rails s
    
access this url [http://localhost:3000/notee](http://localhost:3000/notee/)  
and Enter your notee_id & notee_password!

## Authority

|            |Writer      |Editor      |Manager     |Root        |Deleted     | 
|:-----------|:----------:|:----------:|:----------:|:----------:|:----------:|
| Post(Create)       |           🙆|            ○ |           ○ |             ||
| Post(Update)       |     My Post |            ○ |           ○ |             ||
| Post(Destroy)      |             |            ○ |           ○ |             ||
| Category(Create)    |           ○ |            ○ |           ○ |             ||
| Category(Update)    |           ○ |            ○ |           ○ |             ||
| Category(Destroy)   |           ○ |            ○ |           ○ |             ||
| Image(Create)       |           ○ |            ○ |           ○ |             ||
| Image(Destroy)     |             |            ○ |           ○ |             ||
| User(Create)       |             |              |           ○ |           ○ ||
| User(Update)       |  My Profile |   My Profile |           ○ |  My Profile ||
| User(Destroy)      |             |              |           ○ |             ||

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
