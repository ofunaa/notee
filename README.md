# Notee

Notee is creating blog gem by only one command.

## Installation

```ruby
gem 'notee'
```
    $ bundle install
    $ bundle exec rake notee:start

## syntax highlight

download
https://highlightjs.org/download/

add highlight.pack.js to assets/javascript/

add what you like to assets/css

and add this code to application.js

```js
$(document).on('ready', function() {
  hljs.initHighlightingOnLoad();
});
```

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
