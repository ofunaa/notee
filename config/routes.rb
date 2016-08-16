Notee::Engine.routes.draw do

  root to: 'notees#index'

  get 'new'       => 'notees#index'
  get 'edit/:id'  => 'notees#index'
  get 'category'  => 'notees#index'
  get 'image'     => 'notees#index'
  get 'user'     => 'notees#index'
  get 'user/new'     => 'notees#index'
  get 'user/edit/:id'     => 'notees#index'

  post 'secret_published' => 'notees#secret_published'
  resources :tokens, only: [:new, :create, :destroy]

  scope :api, { format: 'json' } do
    resources :posts, only: [:index, :show, :create, :update, :destroy]
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :images, only: [:index, :show, :create, :destroy]
    resources :categories, only: [:index, :show, :create, :update, :destroy]
    resources :statuses, only: [:index, :show]
    resources :comments, only: [:show, :create]
  end
end
