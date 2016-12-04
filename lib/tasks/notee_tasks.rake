desc 'setup notee'
namespace :notee do

  require 'fileutils'

  task :start do
    notee_mark
    sh 'bundle exec rake notee:install:migrations'
    add_engine_to_route
    create_initializer_file
    copy_directory("/app/views/", "../views/notee")
    copy_directory("/app/assets/stylesheets/notee/", "../css/notee")
    create_file("/config/schedule.rb", "../config/schedule.rb", nil)
    create_file("/app/controllers/notee_controller.rb", "../controllers/notee_controller.rb", nil)
    copy_default_image("/public/notee")
    copy_default_image("/public/notee/profile")
    sh 'bundle exec whenever --update-crontab RAILS_ENV=production'
  end

  def notee_mark
    puts "
________________________________
________________________________

|\\   |
| \\  |  ___  __|__ __|__  __
|  \\ | |   |   |     |   /__\\
|   \\| |___|   |     |   \\___

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

  mount Notee::Engine => '/notee'

  get '/'                           => 'notee#index',           as: 'notee_public_index'
  get '/categories'                 => 'notee#categories',      as: 'notee_public_categories'
  get '/categories/:name_or_slug'   => 'notee#category_posts',  as: 'notee_public_category_posts'
  get '/archives'                   => 'notee#archives',        as: 'notee_public_archives'
  get '/archives/:year'             => 'notee#archive_posts',   as: 'notee_public_archive_posts'
  get '/archives/:year/:month'      => 'notee#archive_posts'
  get '/writers'                    => 'notee#writers',         as: 'notee_public_writers'
  get '/writers/:name_or_id'        => 'notee#writer_posts',    as: 'notee_public_writer_posts'
  get '/:id_or_slug'                => 'notee#show',            as: 'notee_public_show'

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
    title: "Notee",
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

  def create_file(create_path, origin_path, dir)
    if dir.present?
      new_dir = Rails.root.to_s + dir.to_s
      FileUtils.mkdir_p(new_dir) unless FileTest.exist?(new_dir)
    end

    create_file_path = Rails.root.to_s + create_path.to_s
    return if File.exist?(create_file_path)

    origin_file = File.open(File.expand_path(origin_path.to_s, __FILE__))
    new_file = String.new
    origin_file.each_line do |line|
      new_file += line
    end

    File.open(create_file_path,"w") do |file|
      file.puts new_file
    end
    puts 'create file in ' + create_file_path.to_s
  end

  def copy_directory(create_dir, origin_dir)
    FileUtils.cp_r(File.expand_path(origin_dir.to_s, __FILE__), Rails.root.to_s + create_dir.to_s)
  end

end
