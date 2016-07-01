= Notee

This project rocks and uses MIT-LICENSE.

①bundle install

②bundle exec rake notee:install:migrations

③bundle exec rake db:migrate SCOPE=notee

④edit routes.rb  add follow sentense

```:rb
mount Notee::Engine => "/notee"
```

⑤rails s

http://localhost:3000/notee
