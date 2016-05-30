require 'rails'
require 'generators/notee/orm_helper'
require 'rails/generators/migration'
require 'rails/generators/active_record'

module Notee
  class InstallGenerator < Rails::Generators::Base

    include Notee::Generators::OrmHelpers
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
