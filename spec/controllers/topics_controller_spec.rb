# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::TopicsController, type: :controller do
  let(:valid_attributes) do
    skip('Add a hash of attributes valid for your model')
  end

  let(:invalid_attributes) do
    skip('Add a hash of attributes invalid for your model')
  end

  let(:valid_session) { {} }

  describe 'GET #index' do
    it 'returns a success response' do
      Topic.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      topic = Topic.create! valid_attributes
      get :show, params: { id: topic.to_param }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #new' do
    it 'returns a success response' do
      get :new, params: {}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #edit' do
    it 'returns a success response' do
      topic = Topic.create! valid_attributes
      get :edit, params: { id: topic.to_param }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Topic' do
        expect do
          post :create, params: { topic: valid_attributes }, session: valid_session
        end.to change(Topic, :count).by(1)
      end

      it 'redirects to the created topic' do
        post :create, params: { topic: valid_attributes }, session: valid_session
        expect(response).to redirect_to(Topic.last)
      end
    end

    context 'with invalid params' do
      it "returns a success response (i.e. to display the 'new' template)" do
        post :create, params: { topic: invalid_attributes }, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) do
        skip('Add a hash of attributes valid for your model')
      end

      it 'updates the requested topic' do
        topic = Topic.create! valid_attributes
        put :update, params: { id: topic.to_param, topic: new_attributes }, session: valid_session
        topic.reload
        skip('Add assertions for updated state')
      end

      it 'redirects to the topic' do
        topic = Topic.create! valid_attributes
        put :update, params: { id: topic.to_param, topic: valid_attributes }, session: valid_session
        expect(response).to redirect_to(topic)
      end
    end

    context 'with invalid params' do
      it "returns a success response (i.e. to display the 'edit' template)" do
        topic = Topic.create! valid_attributes
        put :update, params: { id: topic.to_param, topic: invalid_attributes }, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested topic' do
      topic = Topic.create! valid_attributes
      expect do
        delete :destroy, params: { id: topic.to_param }, session: valid_session
      end.to change(Topic, :count).by(-1)
    end

    it 'redirects to the topics list' do
      topic = Topic.create! valid_attributes
      delete :destroy, params: { id: topic.to_param }, session: valid_session
      expect(response).to redirect_to(topics_url)
    end
  end
end
