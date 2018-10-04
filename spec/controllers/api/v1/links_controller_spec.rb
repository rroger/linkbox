# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::LinksController do
  let(:valid_attributes) do
    skip('Add a hash of attributes valid for your model')
  end

  let(:invalid_attributes) do
    skip('Add a hash of attributes invalid for your model')
  end

  describe 'GET #index' do
    it 'returns a success response' do
      Link.create! valid_attributes
      get :index, params: {}
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      link = Link.create! valid_attributes
      get :show, params: { id: link.to_param }
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Link' do
        expect do
          post :create, params: { link: valid_attributes }
        end.to change(Link, :count).by(1)
      end

      it 'redirects to the created link' do
        post :create, params: { link: valid_attributes }
        expect(response).to redirect_to(Link.last)
      end
    end

    context 'with invalid params' do
      it "returns a success response (i.e. to display the 'new' template)" do
        post :create, params: { link: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) do
        skip('Add a hash of attributes valid for your model')
      end

      it 'updates the requested link' do
        link = Link.create! valid_attributes
        put :update, params: { id: link.to_param, link: new_attributes }
        link.reload
        skip('Add assertions for updated state')
      end

      it 'redirects to the link' do
        link = Link.create! valid_attributes
        put :update, params: { id: link.to_param, link: valid_attributes }
        expect(response).to redirect_to(link)
      end
    end

    context 'with invalid params' do
      it "returns a success response (i.e. to display the 'edit' template)" do
        link = Link.create! valid_attributes
        put :update, params: { id: link.to_param, link: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested link' do
      link = Link.create! valid_attributes
      expect do
        delete :destroy, params: { id: link.to_param }
      end.to change(Link, :count).by(-1)
    end

    it 'redirects to the api_v1_links list' do
      link = Link.create! valid_attributes
      delete :destroy, params: { id: link.to_param }
      expect(response).to redirect_to(api_v1_links_url)
    end
  end
end
