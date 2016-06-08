# -*- encoding: utf-8 -*-
# stub: paperclip 4.3.6 ruby lib

Gem::Specification.new do |s|
  s.name = "paperclip"
  s.version = "4.3.6"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Jon Yurek"]
  s.date = "2016-03-13"
  s.description = "Easy upload management for ActiveRecord"
  s.email = ["jyurek@thoughtbot.com"]
  s.homepage = "https://github.com/thoughtbot/paperclip"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 1.9.2")
  s.requirements = ["ImageMagick"]
  s.rubygems_version = "2.5.1"
  s.summary = "File attachments as attributes for ActiveRecord"

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<activemodel>, [">= 3.2.0"])
      s.add_runtime_dependency(%q<activesupport>, [">= 3.2.0"])
      s.add_runtime_dependency(%q<cocaine>, ["~> 0.5.5"])
      s.add_runtime_dependency(%q<mime-types>, [">= 0"])
      s.add_runtime_dependency(%q<mimemagic>, ["= 0.3.0"])
      s.add_development_dependency(%q<activerecord>, [">= 3.2.0"])
      s.add_development_dependency(%q<shoulda>, [">= 0"])
      s.add_development_dependency(%q<rspec>, ["~> 3.0"])
      s.add_development_dependency(%q<appraisal>, [">= 0"])
      s.add_development_dependency(%q<mocha>, [">= 0"])
      s.add_development_dependency(%q<aws-sdk>, ["<= 2.0", ">= 1.5.7"])
      s.add_development_dependency(%q<bourne>, [">= 0"])
      s.add_development_dependency(%q<cucumber>, ["~> 1.3.18"])
      s.add_development_dependency(%q<aruba>, ["~> 0.9.0"])
      s.add_development_dependency(%q<nokogiri>, [">= 0"])
      s.add_development_dependency(%q<capybara>, [">= 0"])
      s.add_development_dependency(%q<bundler>, [">= 0"])
      s.add_development_dependency(%q<fog-aws>, [">= 0"])
      s.add_development_dependency(%q<fog-local>, [">= 0"])
      s.add_development_dependency(%q<launchy>, [">= 0"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<fakeweb>, [">= 0"])
      s.add_development_dependency(%q<railties>, [">= 0"])
      s.add_development_dependency(%q<actionmailer>, [">= 3.2.0"])
      s.add_development_dependency(%q<generator_spec>, [">= 0"])
      s.add_development_dependency(%q<timecop>, [">= 0"])
    else
      s.add_dependency(%q<activemodel>, [">= 3.2.0"])
      s.add_dependency(%q<activesupport>, [">= 3.2.0"])
      s.add_dependency(%q<cocaine>, ["~> 0.5.5"])
      s.add_dependency(%q<mime-types>, [">= 0"])
      s.add_dependency(%q<mimemagic>, ["= 0.3.0"])
      s.add_dependency(%q<activerecord>, [">= 3.2.0"])
      s.add_dependency(%q<shoulda>, [">= 0"])
      s.add_dependency(%q<rspec>, ["~> 3.0"])
      s.add_dependency(%q<appraisal>, [">= 0"])
      s.add_dependency(%q<mocha>, [">= 0"])
      s.add_dependency(%q<aws-sdk>, ["<= 2.0", ">= 1.5.7"])
      s.add_dependency(%q<bourne>, [">= 0"])
      s.add_dependency(%q<cucumber>, ["~> 1.3.18"])
      s.add_dependency(%q<aruba>, ["~> 0.9.0"])
      s.add_dependency(%q<nokogiri>, [">= 0"])
      s.add_dependency(%q<capybara>, [">= 0"])
      s.add_dependency(%q<bundler>, [">= 0"])
      s.add_dependency(%q<fog-aws>, [">= 0"])
      s.add_dependency(%q<fog-local>, [">= 0"])
      s.add_dependency(%q<launchy>, [">= 0"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<fakeweb>, [">= 0"])
      s.add_dependency(%q<railties>, [">= 0"])
      s.add_dependency(%q<actionmailer>, [">= 3.2.0"])
      s.add_dependency(%q<generator_spec>, [">= 0"])
      s.add_dependency(%q<timecop>, [">= 0"])
    end
  else
    s.add_dependency(%q<activemodel>, [">= 3.2.0"])
    s.add_dependency(%q<activesupport>, [">= 3.2.0"])
    s.add_dependency(%q<cocaine>, ["~> 0.5.5"])
    s.add_dependency(%q<mime-types>, [">= 0"])
    s.add_dependency(%q<mimemagic>, ["= 0.3.0"])
    s.add_dependency(%q<activerecord>, [">= 3.2.0"])
    s.add_dependency(%q<shoulda>, [">= 0"])
    s.add_dependency(%q<rspec>, ["~> 3.0"])
    s.add_dependency(%q<appraisal>, [">= 0"])
    s.add_dependency(%q<mocha>, [">= 0"])
    s.add_dependency(%q<aws-sdk>, ["<= 2.0", ">= 1.5.7"])
    s.add_dependency(%q<bourne>, [">= 0"])
    s.add_dependency(%q<cucumber>, ["~> 1.3.18"])
    s.add_dependency(%q<aruba>, ["~> 0.9.0"])
    s.add_dependency(%q<nokogiri>, [">= 0"])
    s.add_dependency(%q<capybara>, [">= 0"])
    s.add_dependency(%q<bundler>, [">= 0"])
    s.add_dependency(%q<fog-aws>, [">= 0"])
    s.add_dependency(%q<fog-local>, [">= 0"])
    s.add_dependency(%q<launchy>, [">= 0"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<fakeweb>, [">= 0"])
    s.add_dependency(%q<railties>, [">= 0"])
    s.add_dependency(%q<actionmailer>, [">= 3.2.0"])
    s.add_dependency(%q<generator_spec>, [">= 0"])
    s.add_dependency(%q<timecop>, [">= 0"])
  end
end
