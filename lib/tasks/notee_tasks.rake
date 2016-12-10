desc 'setup notee'
namespace :notee do
  require 'fileutils'


  APPLICATION_JS_PATH = "/app/assets/javascripts/application.js"
  ADD_HIGHLIGHT_TXT = <<-EOC

//////// default notee setting

$(document).on('ready', function() {
  hljs.initHighlightingOnLoad();
});

//////// notee setting end

  EOC


  APPLICATION_CSS_PATH = "/app/assets/stylesheets/application.css"
  ADD_CSS_TXT = <<-EOC

//////// default notee setting

 *= require_directory .
 *= require_directory ./notee

//////// notee setting end

  EOC


  ROUTE_FILE_PATH = "/config/routes.rb"
  ADD_ROUTE_TXT = <<-EOC

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

  ######## notee setting end

  EOC


  ENV_PRODUCTION_FILE_PATH = "/config/environments/production.rb"
  ADD_ENV_PRODUCTION_TXT = "config.exceptions_app = ->(env) { ErrorsController.action(:show).call(env) }"


  #  FILE PATH
  NOTEE_INIT_FILE_PATH = "/config/initializers/notee.rb"
  NOTEE_INIT_FILE_ORIGIN_PATH = "../config/notee.rb"
  NOTEE_LAYOUTS_FILE_PATH = "/app/views/layouts/application.html.erb"
  NOTEE_LAYOUTS_FILE_ORIGIN_PATH = "../views/layouts/notee_application.html.erb"
  NOTEE_SCHEJULE_FILE_PATH = "/config/schedule.rb"
  NOTEE_SCHEJULE_FILE_ORIGIN_PATH = "../config/schedule.rb"
  NOTEE_CONTROLLER_FILE_PATH = "/app/controllers/notee_controller.rb"
  NOTEE_CONTROLLER_FILE_ORIGIN_PATH = "../controllers/notee_controller.rb"

  # Directory PATH
  NOTEE_VIEW_DIR_PATH = "/app/views/notee/"
  NOTEE_VIEW_DIR_ORIGIN_PATH = "../views/notee"
  NOTEE_CSS_DIR_PATH = "/app/assets/stylesheets/notee/"
  NOTEE_CSS_DIR_ORIGIN_PATH = "../stylesheets/notee"
  NOTEE_JS_DIR_PATH = "/app/assets/javascripts/notee/"
  NOTEE_JS_DIR_ORIGIN_PATH = "../javascripts/notee"
  NOTEE_IMAGE_DIR_PATH = "/public/notee/"
  NOTEE_IMAGE_DIR_ORIGIN_PATH = "../images/notee"



  task :start do
    notee_mark
    sh 'bundle exec rake notee:install:migrations'

    # Add Code
    add_notee_code( APPLICATION_JS_PATH,   ADD_HIGHLIGHT_TXT,  "//= require_tree .", "hljs.initHighlightingOnLoad()" )
    add_notee_code( APPLICATION_CSS_PATH,  ADD_CSS_TXT,        "*= require_tree .", "*= require_directory ./notee" )
    delete_line( APPLICATION_CSS_PATH, "*= require_tree ." )
    add_notee_code( ROUTE_FILE_PATH,       ADD_ROUTE_TXT,      "Rails.application.routes.draw do",  "Notee::Engine" )
    add_line( ENV_PRODUCTION_FILE_PATH, ADD_ENV_PRODUCTION_TXT, "Rails.application.configure do")

    # Copy Directory
    copy_directory( NOTEE_VIEW_DIR_PATH,   NOTEE_VIEW_DIR_ORIGIN_PATH )
    copy_directory( NOTEE_CSS_DIR_PATH,    NOTEE_CSS_DIR_ORIGIN_PATH )
    copy_directory( NOTEE_JS_DIR_PATH,     NOTEE_JS_DIR_ORIGIN_PATH )
    copy_directory( NOTEE_IMAGE_DIR_PATH,  NOTEE_IMAGE_DIR_ORIGIN_PATH )

    # Create File
    create_file( NOTEE_INIT_FILE_PATH,   NOTEE_INIT_FILE_ORIGIN_PATH)
    create_file( NOTEE_LAYOUTS_FILE_PATH,   NOTEE_LAYOUTS_FILE_ORIGIN_PATH)
    create_file( NOTEE_SCHEJULE_FILE_PATH,    NOTEE_SCHEJULE_FILE_ORIGIN_PATH)
    create_file( NOTEE_CONTROLLER_FILE_PATH,  NOTEE_CONTROLLER_FILE_ORIGIN_PATH)
    sh 'bundle exec whenever --update-crontab RAILS_ENV=production'
  end

  
  task :destroy do

    # Delete File
    delete_file(NOTEE_CONTROLLER_FILE_PATH)
    delete_file(NOTEE_SCHEJULE_FILE_PATH)
    delete_file(NOTEE_LAYOUTS_FILE_PATH)
    delete_file(NOTEE_INIT_FILE_PATH)

    # Delete Directory
    delete_directory(NOTEE_IMAGE_DIR_PATH)
    delete_directory(NOTEE_JS_DIR_PATH)
    delete_directory(NOTEE_CSS_DIR_PATH)
    delete_directory(NOTEE_VIEW_DIR_PATH)

    # Delete Code
    delete_line( ENV_PRODUCTION_FILE_PATH, ADD_ENV_PRODUCTION_TXT)
    delete_notee_code(ROUTE_FILE_PATH, "######## default notee path", "######## notee setting end")
    delete_notee_code(APPLICATION_CSS_PATH, "//////// default notee setting", "//////// notee setting end")
    delete_notee_code(APPLICATION_JS_PATH, "//////// default notee setting", "//////// notee setting end")
    add_line(APPLICATION_CSS_PATH, "*= require_tree .", "//////// notee setting end")

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



  def add_notee_code(file_path, insert_txt, beginning_line, check_txt)
    add_file_path = Rails.root.to_s  + file_path

    return puts 'add notee code failed => '+ add_file_path + '\n' unless add_file = File.open(add_file_path,"r")
    return if File.open(add_file_path,"r").read.include?(check_txt)

    new_file = String.new
    add_file.each_line do |line|
      line += insert_txt if line.include?(beginning_line)
      new_file += line
    end

    f = File.open(add_file_path,"w")
    f.write(new_file)
    f.close()

    puts 'Notee added code => ' + add_file_path
  end



  def delete_notee_code(file_path, beginning_line, ending_line)
    delete_file_path = Rails.root.to_s  + file_path

    return puts 'delete failed => notee code '+ delete_file_path + '\n' unless delete_file = File.open(delete_file_path,"r")
    return unless File.open(delete_file_path,"r").read.include?(beginning_line)

    new_file_text = String.new
    initial_txt = true

    delete_file.each_line do |line|
      initial_txt = false if line.include?(beginning_line)
      if line.include?(ending_line)
        initial_txt = true
        next
      end

      next unless initial_txt

      new_file_text += line
    end

    f = File.open(delete_file_path,"w")
    f.write(new_file_text)
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



  def add_line(file_path, add_line, beginning_path,)
    add_file_path = Rails.root.to_s  + file_path

    txt = <<-EOC

  #{add_line}
    EOC

    return puts 'add failed => notee code '+ add_file_path + '\n' unless delete_file = File.open(add_file_path,"r")
    return if File.open(add_file_path,"r").read.include?(add_line)

    new_file_text = String.new
    initial_txt = true

    delete_file.each_line do |line|
      line += txt if line.include?(beginning_path)
      new_file_text += line if initial_txt
    end

    f = File.open(add_file_path,"w")
    f.write(new_file_text)
    f.close()

    puts 'Notee added => ' + add_line + ' in' + add_file_path
  end



  def delete_line(file_path, delete_line)
    delete_file_path = Rails.root.to_s  + file_path

    return puts 'delete failed => notee code '+ delete_file_path + '\n' unless delete_file = File.open(delete_file_path,"r")
    return unless File.open(delete_file_path,"r").read.include?(delete_line)

    new_file_text = String.new
    initial_txt = true

    delete_file.each_line do |line|
      line = "" if line.include?(delete_line)
      new_file_text += line if initial_txt
    end

    f = File.open(delete_file_path,"w")
    f.write(new_file_text)
    f.close()

    puts 'Notee deleted => ' + delete_line + ' in' + delete_file_path
  end


end
