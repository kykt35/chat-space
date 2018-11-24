Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resources :users ,only: [:edit, :update]
  resources :groups, only: [:index, :create, :update, :edit, :new] do
    resources :messages, only: [:index, :create]
  end
end
