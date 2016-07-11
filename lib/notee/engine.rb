module Notee
  class Engine < ::Rails::Engine
    isolate_namespace Notee

    initializer "notee.assets.precompile" do |app|
      app.config.assets.precompile += %w(*.js *.css)
    end

  end
end
