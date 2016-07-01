= Notee

This project rocks and uses MIT-LICENSE.

bundle install

bundle exec rake notee:install:migrations

bundle exec rake db:migrate SCOPE=notee

edit routes.rb


```:rb
mount Notee::Engine => "/notee"
```

rails s

http://localhost:3000/notee
