require 'yaml'

module Notee
  class Secret
    class << self

      def id
        get_secret["NOTEE"]["ID"]
      end

      def password
        get_secret["NOTEE"]["PASSWORD"]
      end

      private
      def get_secret
        config_dir = File.expand_path('../config', __FILE__)
        YAML::load(File.open(config_dir + '/secret.yml'))
      end

    end

  end
end
