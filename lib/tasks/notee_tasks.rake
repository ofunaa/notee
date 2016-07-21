desc 'setup notee'
namespace :notee do

  task :start do
    notee_mark
    sh 'bundle exec rake notee:install:migrations'
    add_engine_to_route
    create_initializer_file
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
  config.notee_id = "hogehoge"
  config.notee_password = "hogehoge"
end
EOC

    File.open(file_path,"w") do |file|
      file.puts str
    end
    puts 'create file in "config/initializers/notee.rb"'
    puts 'you should change notee_id & notee_password'
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
