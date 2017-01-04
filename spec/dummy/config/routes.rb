Rails.application.routes.draw do

  mount Notee::Engine => "/notee"

  get '/' => 'blog#index'
  get '/category/:category_slug' => 'blog#notee_category'
  get '/:id' => 'blog#notee_id'
  get '/:slug' => 'blog#notee_slug'
end
