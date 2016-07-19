Notee::Engine.routes.draw do

  root to: 'notees#index'

  get 'new'       => 'notees#index'
  get 'edit/:id'  => 'notees#index'
  get 'category'  => 'notees#index'
  get 'image'     => 'notees#index'

  resources :tokens, only: [:new, :create, :destroy]

  scope :api, { format: 'json' } do
    resources :posts, only: [:index, :show, :create, :update, :destroy]
    resources :images, only: [:index, :show, :create, :destroy]
    resources :categories, only: [:index, :show, :create, :update, :destroy]
  end
end
