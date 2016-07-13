require 'notee/helper'
require 'notee/view_helper'

module Notee
  class Engine < ::Rails::Engine
    isolate_namespace Notee

    initializer "notee.assets.precompile" do |app|
      app.config.assets.precompile += %w(*.js *.css)
    end

    initializer 'notee.action_controller_helpers' do
      ActiveSupport.on_load :action_controller do
        include Notee::Helper
      end
    end

    initializer 'notee.action_view_helpers' do
      ActiveSupport.on_load :action_view do
        include Notee::ViewHelper
      end
    end

  end
end
