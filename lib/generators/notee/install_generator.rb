require 'rails'
require 'rails/generators/active_record'
require 'fileutils'

module Notee
  class InstallGenerator < Rails::Generators::Base

    include ::ActiveRecord::Generators::Migration
    
    source_root File.expand_path('../templates', __FILE__)

    NOTEE = ["notee_post", "notee_image", "notee_category"]

    def copy_notee_migration
      NOTEE.each do |model_name|
        migration_template "migration_#{model_name}.rb", "db/migrate/create_#{model_name}.rb"
      end
    end

    def generate_model
      NOTEE.each do |model_name|
        invoke "active_record:model", [model_name], migration: false
      end
    end

  end
end
