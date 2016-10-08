Rails.application.routes.draw do
  root to: "requests#index"

  resources :users, only: [:new, :create]

  resources :sessions, only: [:create]
  delete '/logout', to: 'sessions#destroy', as: :logout

  resources :requests

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
