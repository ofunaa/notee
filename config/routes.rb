Notee::Engine.routes.draw do

  root to: 'posts#new'
  resources :tokens, only: [:new, :create, :destroy]

  namespace :api, { format: 'json', module: nil } do
    resources :posts, only: [:index, :show, :create, :update, :destroy]
    resources :images, only: [:index, :show, :create, :update, :destroy]
    resources :categories, only: [:index, :show, :create, :update, :destroy]
  end
end
