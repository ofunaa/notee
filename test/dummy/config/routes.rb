Rails.application.routes.draw do

  mount Notee::Engine => "/notee"

  get '/' => 'blog#index'
  get '/category/:category_name' => 'blog#category'
end
