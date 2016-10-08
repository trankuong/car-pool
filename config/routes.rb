Rails.application.routes.draw do
  resources :users, only: [:new, :create]

  resources :sessions, only: [:create]
  delete '/logout', to: 'sessions#destroy', as: :logout

  resources :requests

  Rails.application.routes.draw do
    mount_ember_app :frontend, to: "/"
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
