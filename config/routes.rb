Notee::Engine.routes.draw do

  root to: 'posts#notee'

  resources :tokens, only: [:new, :create, :destroy]

  namespace :api, { format: 'json', module: nil } do
    resources :posts, only: [:index, :show, :create, :update, :destroy]
    resources :images, only: [:index, :create, :destroy]
    resources :categories, only: [:index, :show, :create, :update, :destroy]
  end
end
