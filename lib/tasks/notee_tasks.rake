desc 'setup notee'
namespace :notee do

  require 'fileutils'

  task :start do
    notee_mark
    sh 'bundle exec rake notee:install:migrations'
    add_engine_to_route
    add_highlight_setting_to_js
    add_notee_css_path
    add_viewport_meta_info_and_delete_title
    copy_directory("/app/views/", "../views/notee")
    copy_directory("/app/assets/stylesheets/notee/", "../stylesheets/notee")
    copy_directory("/app/assets/javascripts/notee/", "../javascripts/notee")
    create_file("/config/schedule.rb", "../config/schedule.rb", nil)
    create_file("/app/controllers/notee_controller.rb", "../controllers/notee_controller.rb", nil)
    create_file("/config/initializers/notee.rb", "../config/notee.rb", nil)
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

  get '/about'                      => 'notee#about'

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

  def add_highlight_setting_to_js
    puts ""
    return puts 'setup for highlight.pack.js in /app/assets/javascripts/application.js\n' unless route = File.open("#{Rails.root}/app/assets/javascripts/application.js","r")
    return if File.open("#{Rails.root}/app/assets/javascripts/application.js","r").read.include?("hljs.initHighlightingOnLoad()")

    text = <<-EOC

// ///////////////////////////
// default notee setting
// ///////////////////////////

$(document).on('ready', function() {
  hljs.initHighlightingOnLoad();
});

    EOC

    new_js = String.new
    route.each_line do |line|
      line += text if line.include?("//= require_tree .")
      new_js += line
    end

    f = File.open("#{Rails.root}/app/assets/javascripts/application.js","w")
    f.write(new_js)
    f.close()

    puts 'Notee added "hljs.initHighlightingOnLoad();" to /app/assets/javascripts/application.js'
    puts ""
  end


  def add_notee_css_path
    puts ""
    return puts 'setup for application.css in /app/assets/stylesheets/application.css\n' unless route = File.open("#{Rails.root}/app/assets/stylesheets/application.css","r")
    return if File.open("#{Rails.root}/app/assets/stylesheets/application.css","r").read.include?("*= require_directory ./notee")

    text = <<-EOC

// ///////////////////////////
// default notee setting
// ///////////////////////////

*= require_directory .
*= require_directory ./notee

    EOC

    new_css = String.new
    route.each_line do |line|
      line = text if line.include?("*= require_tree .")
      new_css += line
    end

    f = File.open("#{Rails.root}/app/assets/stylesheets/application.css","w")
    f.write(new_css)
    f.close()

    puts 'Notee added "*= require_directory ./notee" to /app/assets/stylesheets/application.css'
    puts ""
  end

  def add_viewport_meta_info_and_delete_title
    puts ""
    return puts 'setup for application.html.erb in /app/views/layouts/application.html.erb\n' unless route = File.open("#{Rails.root}/app/views/layouts/application.html.erb","r")
    return if File.open("#{Rails.root}/app/views/layouts/application.html.erb","r").read.include?('<meta name="viewport" content="width=device-width,initial-scale=1.0" />')

    text = <<-EOC

    <meta name="viewport" content="width=device-width,initial-scale=1.0" />

    EOC

    new_html = String.new
    route.each_line do |line|
      line += text if line.include?("<head>")
      line = "" if line.include?("<title>")
      new_html += line
    end

    f = File.open("#{Rails.root}/app/views/layouts/application.html.erb","w")
    f.write(new_html)
    f.close()

    puts 'Notee added "viewport meta info" to /app/views/layouts/application.html.erb'
    puts 'Notee deleted "Title tag" in /app/views/layouts/application.html.erb'
    puts ""
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
    new_dir = Rails.root.to_s + create_dir.to_s
    return if FileTest.exist?(new_dir)
    FileUtils.cp_r(File.expand_path(origin_dir.to_s, __FILE__), new_dir)
  end

end
