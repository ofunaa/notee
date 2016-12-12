# This migration comes from notee (originally 20160605141437)

INITIAL_TXT = <<-EOC

# Notee

Notee is creating CMS(blog) app by only one command.

BackEnd: Ruby(RailsEngine)
FrontEnd: React.js + Riot.js(only comment part)

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

## Helper Method
[Helper Method](https://github.com/funaota/notee/wiki/Helper-Method)

EOC

class CreateNoteePosts < ActiveRecord::Migration
  def change
    create_table :notee_posts do |t|

      # notee's base
      t.string  :title
      t.text    :content
      t.string  :slug
      t.integer :status, default: 0
      t.integer :category_id, default: 0
      t.integer :thumbnail_id, default: 0
      t.datetime :published_at
      t.integer :user_id
      t.boolean :is_deleted, null: false, default: false

      # seo
      t.string  :seo_keyword, default: ""
      t.string  :seo_description, default: ""

      # secret_published
      t.string :secret_published_password


      t.timestamps null: false
    end

    # create default post
    Notee::Post.skip_callback(:create, :before, :create_authority)
    Notee::Post.create(title: "Hello World", content: INITIAL_TXT, status: 1, user_id: 0, category_id: 1, seo_description: "hello world! Notee is creating CMS(blog) app by only one command. BackEnd: Ruby(RailsEngine), FrontEnd: React.js + Riot.js(only comment part)", thumbnail_id: 1)
    Notee::Post.set_callback(:create, :before, :create_authority)

    add_index :notee_posts, :slug, :unique => true
  end
end
