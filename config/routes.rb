# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'landing#index'
    namespace :v1 do
      resources :topics, only: %i[index show create destroy update]
    end
  end
end
