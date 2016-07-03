desc 'setup notee'
namespace :notee do
  task :start do
    notee_mark
    sh 'bundle exec rake notee:install:migrations'
    add_engine_to_route
    create_initializer_file
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
    return puts 'setup Notee Engine in config/route.rb\n' unless route_file = File.open("#{Rails.root}/config/routes.rb","r")

    notee_routes_str = String.new
    text = <<-EOC

  mount Notee::Engine => "/notee"
EOC

    route_file.each_line do |line|
      line += text if line.include?("Rails.application.routes.draw do")
      notee_routes_str += line
    end

    f = File.open("#{Rails.root}/config/routes.rb","w")
    f.write(notee_routes_str)
    f.close()

    puts 'add "mount Notee::Engine => "/notee" to config/route.rb'
    puts ""
  end

  def create_initializer_file
    file_path = "#{Rails.root}/config/initializers/notee.rb"
    return unless File.exist?(file_path)

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
    puts ""
    puts ""
  end

end
