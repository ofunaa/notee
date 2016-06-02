# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'notee/version'

Gem::Specification.new do |spec|
  spec.name          = "notee"
  spec.version       = Notee::VERSION
  spec.authors       = ["takujifunao"]
  spec.email         = ["takuji.funao@gmail.com"]

  spec.summary       = %q{notee is very simple blogging gem.}
  spec.description   = %q{notee create simple blog application.}
  spec.homepage      = "https://github.com/maru-3/notee.git"
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org by setting 'allowed_push_host', or
  # delete this section to allow pushing this gem to any host.

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency "carrierwave", "~> 0.10.0"
  spec.add_dependency "rmagick"

  spec.add_development_dependency "bundler", "~> 1.10"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec"
end
