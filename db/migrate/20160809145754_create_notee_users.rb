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

class CreateNoteeUsers < ActiveRecord::Migration
  def change
    create_table :notee_users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :encrypted_password, null: false
      t.text :profile
      t.string :profile_img
      t.integer :role, null: false
      t.boolean :is_deleted, null: false, default: false

      t.timestamps null: false
    end

    add_index :notee_users, [:name, :email], :unique => true

    # create root User
    Notee::User.skip_callback(:create, :before, :create_authority)
    Notee::User.create(id: 0, name: Notee.notee_id, email: "root", password: SecureRandom.hex, role: 9999)
    Notee::User.set_callback(:create, :before, :create_authority)

    # create default image
    Notee::Image.skip_callback(:create, :before, :create_authority)
    Notee::Image.create :content => 'default.png'
    Notee::Image.set_callback(:create, :before, :create_authority)

    # create default category
    Notee::Category.skip_callback(:create, :before, :create_authority)
    Notee::Category.create :name => 'No_Category'
    Notee::Category.set_callback(:create, :before, :create_authority)

    # create default post
    Notee::Post.skip_callback(:create, :before, :create_authority)
    Notee::Post.create(title: "Hello World", content: INITIAL_TXT, status: 1, user_id: 0, category_id: 1, seo_description: "hello world! Notee is creating CMS(blog) app by only one command. BackEnd: Ruby(RailsEngine), FrontEnd: React.js + Riot.js(only comment part)", thumbnail_id: 1)
    Notee::Post.set_callback(:create, :before, :create_authority)

  end
end
