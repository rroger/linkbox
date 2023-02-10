Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'landing#index'
   # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
    namespace :api, defaults: { format: :json } do
      namespace :v1 do
        resources :topics, only: %i[index show create destroy update]
        resources :links, only: %i[index show create destroy update]
      end
    end
end

