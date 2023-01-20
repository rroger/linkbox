# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::LinksController do
  let(:invalid_attributes) { { data: { attributes: { url: '' } } } }

  subject(:parsed_body) { JSON.parse(response.body, symbolize_names: true) }

  describe 'POST #create' do
    context 'with valid params' do
      let(:topic) { create :topic }
      let(:valid_attributes) do
        { data: { id: nil, type: 'link', attributes: { title: 'Newly created Link',
                                                       url: 'https://new-created.ch',
                                                       topic_id: topic.id } } }
      end

      it 'creates a new Link' do
        expect do
          post :create, params: { data: valid_attributes[:data] }
        end.to change(Link, :count).by(1)
      end

      it 'returns the created topic' do
        post :create, params: valid_attributes
        expect(JSON.parse(response.body, symbolize_names: true)).to eq(
          data: {
            id: Link.last.id.to_s,
            type: 'link',
            attributes: {
              completed: false,
              notes: nil,
              order: 0,
              title: 'Newly created Link',
              url: 'https://new-created.ch',
              topic_id: topic.id,
              topic_name: topic.name,
              topic_color: topic.color
            }
          }
        )
      end
    end

    context 'with invalid params' do
      it "returns a success response (i.e. to display the 'new' template)" do
        post :create, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  context('with existing link') do
    let!(:link) { create :link }

    describe 'GET #index' do
      it 'returns a success response' do
        get :index, params: {}

        expect(response).to be_successful
        expect(parsed_body).to eq(data: [
                                    { attributes: {
                                      completed: link.completed,
                                      notes: link.notes,
                                      order: 0,
                                      title: link.title,
                                      url: link.url,
                                      topic_name: link.topic.name,
                                      topic_id: link.topic.id,
                                      topic_color: link.topic.color
                                    },
                                      id: link.id.to_s,
                                      type: 'link' }
                                  ])
      end
    end

    describe 'GET #show' do
      it 'returns a success response' do
        get :show, params: { id: link.to_param }

        expect(response).to be_successful
        expect(parsed_body).to eq(data: {
                                    attributes: {
                                      completed: link.completed,
                                      notes: link.notes,
                                      order: 0,
                                      title: link.title,
                                      url: link.url,
                                      topic_name: link.topic.name,
                                      topic_id: link.topic.id,
                                      topic_color: link.topic.color
                                    },
                                    id: link.id.to_s,
                                    type: 'link'
                                  })
      end
    end

    describe 'PUT #update' do
      context 'with valid params' do
        let(:new_attributes) do
          LinkSerializer.new(Link.new(topic: create(:topic),
                                      url: 'https://new.ch',
                                      title: 'new link',
                                      notes: 'new notes',
                                      order: 2,
                                      completed: true)).as_json
        end

        it 'updates the requested link' do
          put :update, params: { id: link.to_param, data: new_attributes['data'] }

          link.reload
          expect(link).to have_attributes(new_attributes['data']['attributes'].except('topic_name', 'topic_color'))
        end
      end

      context 'with invalid params' do
        it 'returns status unprocessable_entity' do
          put :update, params: { id: link.to_param, data: invalid_attributes[:data] }

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    describe 'DELETE #destroy' do
      it 'destroys the requested link' do
        expect do
          delete :destroy, params: { id: link.to_param }
        end.to change(Link, :count).by(-1)
      end
    end
  end
end
