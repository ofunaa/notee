require 'rails'
require 'rails/generators/active_record'

module Notee
  class InstallGenerator < Rails::Generators::Base

    include ::ActiveRecord::Generators::Migration
    
    source_root File.expand_path('../templates', __FILE__)

    NOTEE = ["notee_post", "notee_image", "notee_category"]

    def copy_notee_migrations
      NOTEE.each do |model_name|
        migration_template "migrations/migration_#{model_name}.rb", "db/migrate/create_#{model_name}.rb"
      end
    end

    def generate_models
      NOTEE.each do |model_name|
        template "models/#{model_name}.rb", File.join('app/models', "#{model_name}.rb")
      end
    end

    def generate_contoller
      template "controllers/notee_controller.rb", File.join('app/controllers', "notee_controller.rb")
    end

    def generate_view
      template "views/index.html.slim", File.join('app/views/notee', "index_html.slim")
    end

  end
end
