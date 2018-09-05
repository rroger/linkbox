# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'landing#index'
  namespace :api do
    namespace :v1 do
      resources :topics
    end
  end
end
