# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::TopicsController, type: :controller do
  let(:valid_attributes) { attributes_for(:topic) }

  let(:invalid_attributes) { { name: '' } }

  describe 'GET #index' do
    it 'returns a success response' do
      Topic.create! valid_attributes
      get :index, params: {}
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      topic = Topic.create! valid_attributes
      get :show, params: { id: topic.to_param }
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Topic' do
        expect do
          post :create, params: { topic: valid_attributes }
        end.to change(Topic, :count).by(1)
      end

      it 'returns the created topic' do
        post :create, params: { topic: valid_attributes }
        expect(JSON.parse(response.body)).to eq TopicSerializer.new(Topic.last).as_json
      end
    end

    context 'with invalid params' do
      it 'returns status unprocessable_entity' do
        post :create, params: { topic: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) do
        attributes_for(:topic)
      end

      it 'updates the requested topic' do
        topic = Topic.create! valid_attributes
        put :update, params: { id: topic.to_param, topic: new_attributes }
        topic.reload
        expect(topic).to have_attributes(new_attributes)
      end
    end

    context 'with invalid params' do
      it 'returns status unprocessable_entity' do
        topic = Topic.create! valid_attributes
        put :update, params: { id: topic.to_param, topic: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested topic' do
      topic = Topic.create! valid_attributes
      expect do
        delete :destroy, params: { id: topic.to_param }
      end.to change(Topic, :count).by(-1)
    end
  end
end
