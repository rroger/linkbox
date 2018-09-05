# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::TopicsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/v1/topics').to route_to('api/v1/topics#index')
    end

    it 'routes to #new' do
      expect(get: '/api/v1//topics/new').to route_to('api/v1/topics#new')
    end

    it 'routes to #show' do
      expect(get: '/api/v1//topics/1').to route_to('api/v1/topics#show', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/api/v1//topics/1/edit').to route_to('vtopics#edit', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/api/v1//topics').to route_to('api/v1/topics#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/topics/1').to route_to('topics#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/api/v1//topics/1').to route_to('api/v1/topics#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/api/v1//topics/1').to route_to('api/v1/topics#destroy', id: '1')
    end
  end
end
