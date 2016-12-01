desc 'setup notee'
namespace :notee do

  task :start do
    notee_mark
    sh 'bundle exec rake notee:install:migrations'
    add_engine_to_route
    create_initializer_file
    create_schedule_file
    create_css_file
    setup_default
    sh 'bundle exec whenever --update-crontab RAILS_ENV=production'
  end

  def notee_mark
    puts "
________________________________
________________________________

|\   |
| \  |  ___  __|__ __|__  __
|  \ | |   |   |     |   /__\
|   \| |___|   |     |   \___

________________________________
________________________________

"
  end

  def add_engine_to_route
    puts ""
    return puts 'setup Notee Engine in config/route.rb\n' unless route = File.open("#{Rails.root}/config/routes.rb","r")
    return if File.open("#{Rails.root}/config/routes.rb","r").read.include?("Notee::Engine")

    text = <<-EOC

  # ################## #
  # default notee path #
  # ################## #

  get '/'                                   => 'notees#index'
  get '/:id_or_slug'                        => 'notees#show'
  get '/category'                           => 'notees#categories'
  get '/category/:name_or_slug'             => 'notees#category_posts'
  get '/archive'                            => 'notees#archives'
  get '/archive/:year'                      => 'notees#archive_posts'
  get '/archive/:year/:month'               => 'notees#archive_posts'
  get '/new'                                => 'notees#new_arrival'

  mount Notee::Engine => "/notee"
EOC

    new_route = String.new
    route.each_line do |line|
      line += text if line.include?("Rails.application.routes.draw do")
      new_route += line
    end

    f = File.open("#{Rails.root}/config/routes.rb","w")
    f.write(new_route)
    f.close()

    puts 'Notee added "mount Notee::Engine => "/notee" to config/route.rb'
    puts ""
  end

  def create_initializer_file
    file_path = "#{Rails.root}/config/initializers/notee.rb"
    return if File.exist?(file_path)

    str = <<EOC
require 'notee'

# Recommendation using .env for manage id & password

Notee.configure do |config|

  # root-user
  config.notee_id = "hogehoge"
  config.notee_password = "hogehoge"

  # recaptcha
  config.recaptcha_key = "hogehoge"
  config.recaptcha_secret_key = "hogehoge"

  # blog
  config.blog_meta = {
    title: "title",
    url: "http://hogehoge.com",
    keyword: "hoge, hoge, hoge",
    description: "hogehoge",
    og_image: "http://hogehoge.com/hoge.png"
  }

  # google-analytics
  config.google_analytics = "hogehogehogehoge"
end
EOC

    File.open(file_path,"w") do |file|
      file.puts str
    end
    puts 'create file in "config/initializers/notee.rb"'
    puts 'you should change notee_id & notee_password'
  end

  def create_schedule_file
    file_path = "#{Rails.root}/config/schedule.rb"
    return if File.exist?(file_path)

    schejule = File.open(File.expand_path('../config/schedule.rb', __FILE__))
    new_schejule = String.new
    schejule.each_line do |line|
      new_schejule += line
    end


    File.open(file_path,"w") do |file|
      file.puts new_schejule
    end
    puts 'create file in "/config/schejule.rb"'
  end

  def create_css_file
    css_dir = Rails.root.to_s + '/app/assets/stylesheets/notee/'
    FileUtils.mkdir_p(css_dir) unless FileTest.exist?(css_dir)

    file_path = css_dir + 'notee_default.css'
    return if File.exist?(file_path)

    css = File.open(File.expand_path('../css/notee_default.css', __FILE__))
    new_css = String.new
    css.each_line do |line|
      new_css += line
    end


    File.open(file_path,"w") do |file|
      file.puts new_css
    end
    puts 'create file in "/app/assets/stylesheets/notee/notee_default.css"'
  end

  def setup_default
    copy_default_image("/public/notee")
    copy_default_image("/public/notee/profile")
  end

  private

  def copy_default_image(image_path)
    image_dir = Rails.root.to_s + image_path
    FileUtils.mkdir_p(image_dir) unless FileTest.exist?(image_dir)

    image_url = image_dir + '/default.png'
    unless FileTest.exist?(image_url)
      open(image_url, 'wb') do |output|
        output.write(File.open(File.expand_path('../images/default.png', __FILE__)).read)
      end
    end
  end

end
