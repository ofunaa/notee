Notee::Engine.routes.draw do
  get '/' => 'notee#index'
  post '/post' => 'notee#create'

  namespace :api, { format: 'json' } do

  end
end
