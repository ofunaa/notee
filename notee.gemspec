$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "notee/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "notee"
  s.version     = Notee::VERSION
  s.authors     = ["takujifunao"]
  s.email       = ["takuji.funao@gmail.com"]
  s.summary       = %q{notee is very simple blogging gem.}
  s.description   = %q{notee create simple blog application.}
  s.homepage      = "https://github.com/maru-3/notee.git"
  s.license       = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.2.1"

  # image_uploader
  s.add_dependency "paperclip"

  # env
  s.add_dependency "dotenv-rails"

  s.add_development_dependency "sqlite3"

  # debug
  s.add_dependency 'pry-rails'
  s.add_dependency 'pry-doc'
  s.add_dependency 'pry-byebug'
  s.add_dependency 'pry-stack_explorer'
end
