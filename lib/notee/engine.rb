module Notee
  class Engine < ::Rails::Engine
    isolate_namespace Notee

    config.generators do |g|
      g.template_engine :slim
    end

    initializer "notee.assets.precompile" do |app|
      app.config.assets.precompile += %w(*.js *.css)
    end
  end
end
