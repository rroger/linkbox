# frozen_string_literal: true

module Api
  module V1
    class ApiController < ActionController::Base
      protect_from_forgery with: :exception
    end
  end
end
