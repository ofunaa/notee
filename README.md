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

### Editing View

img coming soon

### initial Website View

img coming soon

## Authority

|            |Writer      |Editor      |Manager     |Root        |Deleted     | 
|:-----------|:----------:|:----------:|:----------:|:----------:|:----------:|
| Post(Create)       |           ○ |            ○ |           ○ |             ||
| Post(Update)       |     My Post |            ○ |           ○ |             ||
| Post(Destroy)      |             |            ○ |           ○ |             ||
| Category(Create)    |           ○ |            ○ |           ○ |             ||
| Category(Update)    |           ○ |            ○ |           ○ |             ||
| Category(Destroy)   |            |            ○ |           ○ |             ||
| Image(Create)       |           ○ |            ○ |           ○ |             ||
| Image(Destroy)     |             |            ○ |           ○ |             ||
| User(Create)       |             |              |           ○ |           ○ ||
| User(Update)       |  My Profile |   My Profile |           ○ |  My Profile ||
| User(Destroy)      |             |              |           ○ |             ||

## View Helper Method

### notee_content(notee)

`notee_content(notee)` converts post in markdown notation nice to html and returns it.

### notee_comment_box(id)

`notee_comment_box(id)` render "notee/partials/comment_box.html.erb"

### notee_meta(meta = Notee.blog_meta)

`notee_meta(meta = Notee.blog_meta)` sets and returns meta information feeling nice.

### notee_title

`notee_title` return CMS(blog) title

### notee_description

`notee_description` return CMS(blog) description

## Helper Method

### notee(search_txt)

`notee(search_txt)` method return the published post.

#### search_txt:

- post_id
- post_slug

### notees`

`notee(search_txt)` method return all published post.

### category_notees(search_txt)

`category_notees(search_txt)` method return posts that has category_id correspond to serach_txt.

#### search_txt:

- category_slug
- category_name

### archive_notees(year, month)

`archive_notees(year, month)` method return posts correspond to year or year and month.

### writer_notees(name_or_id)

`writer_notees(name_or_id)` method return writer.posts correspond to name or id.

### notee_categories

`notee_categories` returns hash that all published categories and the number of articles in the category

#### return hash format

```
{notee.category.name, notee.count}
```

### notee_archives

`notee_archives` returns hash that month and the number of articles in the month

#### return hash format

```
{notee.time, notee.count}
```

### notee_writers

`notee_writers` returns all writers

### notee_comments(id)

`notee_comments(id)` return comments on that article of id

### notee_set_meta_by_post(post)

`notee_set_meta_by_post(post)` sets the information of post to hash nicely and returns it


## Setting Google Analytics

coming soon.

## Setting Recaptcha for Comment

coming soon.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
