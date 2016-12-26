Notee::Engine.routes.draw do

  root to: 'notees#index'

  # post 'secret_published' => 'notees#secret_published'
  resources :tokens, only: [:new, :create, :destroy]

  scope :api, { format: 'json' } do
    resources :posts, only: [:index, :show, :create, :update, :destroy]
    get 'users/mypage' => 'users#mypage'
    put 'users/mypage' => 'users#update_password'
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :images, only: [:index, :show, :create, :destroy]
    get 'categories/:id/restrict_parent_ids' => 'categories#restrict_parent_ids'
    resources :categories, only: [:index, :show, :create, :update, :destroy]
    resources :statuses, only: [:index, :show]
    resources :comments, only: [:index, :show, :create, :update, :destroy]
    resources :roles, only: [:index, :show]
    resources :trashes, only: [:index, :update]
  end

  get '*anything'             => 'notees#index'
end
