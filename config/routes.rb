Notee::Engine.routes.draw do

  root to: 'notees#index'

  get 'posts'                 => 'notees#index'
  get 'posts/new'             => 'notees#index'
  get 'posts/edit/:id'        => 'notees#index'
  get 'categories'            => 'notees#index'
  get 'categories/edit/:id'   => 'notees#index'
  get 'images'                => 'notees#index'
  get 'comments'              => 'notees#index'
  get 'users'                 => 'notees#index'
  get 'users/new'             => 'notees#index'
  get 'users/edit/:id'        => 'notees#index'
  get 'trashes'               => 'notees#index'
  get 'trashes/:model'        => 'notees#index'

  # post 'secret_published' => 'notees#secret_published'
  resources :tokens, only: [:new, :create, :destroy]

  scope :api, { format: 'json' } do
    resources :posts, only: [:index, :show, :create, :update, :destroy]
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :images, only: [:index, :show, :create, :destroy]
    resources :categories, only: [:index, :show, :create, :update, :destroy]
    resources :statuses, only: [:index, :show]
    resources :comments, only: [:index, :show, :create, :update, :destroy]
    resources :roles, only: [:index, :show]
    resources :trashes, only: [:index, :update]
  end
end
