# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::TopicsController do
  let(:topic) { build(:topic) }
  let(:invalid_attributes) { { data: { attributes: { name: '' } } } }

  describe 'GET #index' do
    it 'returns a success response' do
      create :topic
      get :index, params: {}
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      topic.save!
      get :show, params: { id: topic.to_param }
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      let(:valid_attributes) { { data: { id: nil, type: 'topic', attributes: { name: 'Architecture' } } } }

      it 'creates a new Topic' do
        expect do
          post :create, params: valid_attributes
        end.to change(Topic, :count).by(1)
      end

      it 'returns the created topic' do
        post :create, params: valid_attributes
        expect(JSON.parse(response.body, symbolize_names: true)).to eq(
          data: {
            id: Topic.last.id.to_s,
            type: 'topic',
            attributes: {
              name: 'Architecture'
            }
          }
        )
      end
    end

    context 'with invalid params' do
      it 'returns status unprocessable_entity' do
        post :create, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
        TopicSerializer.new(build(:topic)).as_json
      end

      it 'updates the requested topic' do
        topic.save!
        put :update, params: { id: topic.to_param, data: new_attributes['data'] }
        topic.reload
        expect(topic).to have_attributes(new_attributes['data']['attributes'])
      end
    end

    context 'with invalid params' do
      it 'returns status unprocessable_entity' do
        topic.save!
        put :update, params: { id: topic.to_param, data: invalid_attributes[:data] }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested topic' do
      topic.save!
      expect do
        delete :destroy, params: { id: topic.to_param }
      end.to change(Topic, :count).by(-1)
    end
  end
end
