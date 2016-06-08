module Notee
  class Engine < ::Rails::Engine
    isolate_namespace Notee

    config.generators do |g|
      g.template_engine :slim
    end
  end
end
