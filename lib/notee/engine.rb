require 'notee/helpers/notee_helper'
require 'notee/helpers/view_helper'

module Notee
  class Engine < ::Rails::Engine
    isolate_namespace Notee

    initializer 'notee.assets.precompile' do |app|
      app.config.assets.precompile += %w(*.js *.css)
    end

    initializer 'notee.action_controller_helpers' do
      ActiveSupport.on_load :action_controller do
        include Notee::Helpers::NoteeHelper
      end
    end

    initializer 'notee.action_view_helpers' do
      ActiveSupport.on_load :action_view do
        include Notee::Helpers::NoteeHelper
        include Notee::Helpers::ViewHelper
      end
    end

    config.generators do |g|
      g.test_framework :rspec, fixtures: false
      g.fixture_replacement :factory_girl, dir: 'spec/factories'
    end

    initializer 'notee.factories', after: 'factory_girl.set_factory_paths' do
      FactoryGirl.definition_file_paths.unshift File.expand_path(Rails.root.to_s + '/spec/dummy/spec/factories', __FILE__)
    end

  end
end
