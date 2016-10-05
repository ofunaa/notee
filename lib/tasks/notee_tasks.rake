desc 'setup notee'
namespace :notee do

  task :start do
    notee_mark
    sh 'bundle exec rake notee:install:migrations'
    add_engine_to_route
    create_initializer_file
    create_css_file
    setup_default
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
  #config.blog_title = "title"
  #config.blog_url = "http://hogehoge.com"
  #config.blog_description = "hogehoge"
  #config.blog_keywords = "hoge, hoge, hoge"
  #config.blog_og_image = "http://hogehoge.com/hoge.png"

  # blog
  config.blog_meta = {
    title: "title",
    url: "http://hogehoge.com",
    description: "hogehoge",
    keywords: "hoge, hoge, hoge",
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

  def create_css_file
    image_dir = Rails.root.to_s + '/app/assets/stylesheets/notee/'
    FileUtils.mkdir_p(image_dir) unless FileTest.exist?(image_dir)

    file_path = image_dir + 'notee_default.css'
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
    copy_default_image
  end

  private

  def copy_default_image
    image_dir = Rails.root.to_s + '/public/notee'
    FileUtils.mkdir_p(image_dir) unless FileTest.exist?(image_dir)

    image_url = image_dir + '/default.png'
    unless FileTest.exist?(image_url)
      open(image_url, 'wb') do |output|
        output.write(File.open(File.expand_path('../images/default.png', __FILE__)).read)
      end
    end
  end

end
