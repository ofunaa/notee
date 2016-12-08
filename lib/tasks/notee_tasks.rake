desc 'setup notee'
namespace :notee do
  require 'fileutils'

  ROUTE_FILE_PATH = "/config/routes.rb"

  NOTEE_VIEW_PATH = "/app/views/notee/"
  NOTEE_VIEW_ORIGIN_PATH = "../views/notee"
  NOTEE_CSS_PATH = "/app/assets/stylesheets/notee/"
  NOTEE_CSS_ORIGIN_PATH = "../stylesheets/notee"
  NOTEE_JS_PATH = "/app/assets/javascripts/notee/"
  NOTEE_JS_ORIGIN_PATH = "../javascripts/notee"
  NOTEE_SCHEJULE_PATH = "/config/schedule.rb"
  NOTEE_SCHEJULE_ORIGIN_PATH = "../config/schedule.rb"
  NOTEE_CONTROLLER_PATH = "/app/controllers/notee_controller.rb"
  NOTEE_CONTROLLER_ORIGIN_PATH = "../controllers/notee_controller.rb"
  NOTEE_INIT_FILE_PATH = "/config/initializers/notee.rb"
  NOTEE_INIT_FILE_ORIGIN_PATH = "../config/notee.rb"
  NOTEE_IMAGE_PATH = "/public/notee/"
  NOTEE_IMAGE_ORIGIN_PATH = "../images/notee"

  task :start do
    notee_mark
    sh 'bundle exec rake notee:install:migrations'
    add_engine_to_route
    add_highlight_setting_to_js
    add_notee_css_path
    add_viewport_meta_info_and_delete_title
    copy_directory( NOTEE_VIEW_PATH,   NOTEE_VIEW_ORIGIN_PATH )
    copy_directory( NOTEE_CSS_PATH,    NOTEE_CSS_ORIGIN_PATH )
    copy_directory( NOTEE_JS_PATH,     NOTEE_JS_ORIGIN_PATH )
    copy_directory( NOTEE_IMAGE_PATH,  NOTEE_IMAGE_ORIGIN_PATH )
    create_file( NOTEE_SCHEJULE_PATH,    NOTEE_SCHEJULE_ORIGIN_PATH)
    create_file( NOTEE_CONTROLLER_PATH,  NOTEE_CONTROLLER_ORIGIN_PATH)
    create_file( NOTEE_INIT_FILE_PATH,   NOTEE_INIT_FILE_ORIGIN_PATH)
    sh 'bundle exec whenever --update-crontab RAILS_ENV=production'
  end

  task :destroy do
    delete_directory(NOTEE_VIEW_PATH)
    delete_directory(NOTEE_CSS_PATH)
    delete_directory(NOTEE_JS_PATH)
    delete_directory(NOTEE_IMAGE_PATH)
    delete_file(NOTEE_SCHEJULE_PATH)
    delete_file(NOTEE_CONTROLLER_PATH)
    delete_file(NOTEE_INIT_FILE_PATH)
    delete_notee_code(ROUTE_FILE_PATH, "######## default notee path", "######## notee setting end")
  end

  private

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
    return puts 'setup Notee Engine in config/route.rb\n' unless route = File.open("#{Rails.root}/config/routes.rb","r")
    return if File.open("#{Rails.root}/config/routes.rb","r").read.include?("Notee::Engine")

    text = <<-EOC

  ######## default notee path

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
  end



  def add_highlight_setting_to_js
    return puts 'setup for highlight.pack.js in /app/assets/javascripts/application.js\n' unless route = File.open("#{Rails.root}/app/assets/javascripts/application.js","r")
    return if File.open("#{Rails.root}/app/assets/javascripts/application.js","r").read.include?("hljs.initHighlightingOnLoad()")

    text = <<-EOC

//////// default notee setting

$(document).on('ready', function() {
  hljs.initHighlightingOnLoad();
});

//////// notee setting end

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
  end





  def add_notee_css_path
    return puts 'setup for application.css in /app/assets/stylesheets/application.css\n' unless route = File.open("#{Rails.root}/app/assets/stylesheets/application.css","r")
    return if File.open("#{Rails.root}/app/assets/stylesheets/application.css","r").read.include?("*= require_directory ./notee")

    text = <<-EOC

//////// default notee setting

 *= require_directory .
 *= require_directory ./notee

//////// notee setting end

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
  end

  def add_viewport_meta_info_and_delete_title
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
  end

  def delete_notee_code(file_path, beginning_line, ending_line)

    delete_file_path = Rails.root + file_path

    return puts 'delete failed => notee code '+ delete_file_path + '\n' unless route = File.open(delete_file_path,"r")
    return unless File.open(delete_file_path,"r").read.include?(beginning_line)

    new_route = String.new
    initial_txt = true

    route.each_line do |line|
      initial_txt = false if line.include?(beginning_line)
      if line.include?(ending_line)
        initial_txt = true
        next
      end

      new_route += line if initial_txt
    end

    f = File.open(delete_file_path,"w")
    f.write(new_route)
    f.close()

    puts 'Notee deleted => notee code in' + delete_file_path
  end

  def create_file(create_path, origin_path)
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
    puts 'create file => ' + create_file_path.to_s
  end

  def delete_file(file_path)
    delete_file_path = Rails.root.to_s + file_path.to_s
    return unless File.exist?(delete_file_path)
    FileUtils.rm_f(delete_file_path)
    puts 'delete file => ' + file_path.to_s
  end

  def copy_directory(create_dir, origin_dir)
    new_dir = Rails.root.to_s + create_dir.to_s
    return if FileTest.exist?(new_dir)
    FileUtils.cp_r(File.expand_path(origin_dir.to_s, __FILE__), new_dir)
    puts 'create directory => ' + create_dir.to_s
  end

  def delete_directory(dir_path)
    delete_dir = Rails.root.to_s + dir_path.to_s
    return unless FileTest.exist?(delete_dir)
    FileUtils.rm_rf(delete_dir)
    puts 'delete directory => ' + dir_path.to_s
  end

end
