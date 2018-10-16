# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Topics page', :js do
  it 'can add a topic' do
    visit '/#/topics'
    click_button 'Add'
    fill_in 'topic-name', with: 'TopicSoNew'
    click_button 'Save'

    expect(page).to have_content 'TopicSoNew'
    expect(Topic.count).to be 1
    expect(Topic.last.name).to eq 'TopicSoNew'
  end

  context 'with existing topics' do
    let!(:topics) { [create(:topic, name: 'AI'), create(:topic, name: 'Style')] }

    before { visit '/#/topics' }

    it 'can list topics' do
      expect(page).to have_content 'AI'
      expect(page).to have_content 'Style'
    end

    it 'can edit a topic' do
      click_button 'EDIT', match: :first
      fill_in 'topic-name', with: 'TopicSoEdited'
      click_button 'Save'

      expect(Topic.count).to be 2
      expect(page).to have_content 'TopicSoEdited'
      expect(page).to_not have_content 'AI'
    end

    it 'can delete a topic' do
      click_button 'EDIT', match: :first
      click_button 'Delete'
      sleep(0.1)
      click_button 'Proceed'

      expect(Topic.count).to be 1
      expect(page).to have_content "Successfully deleted Topic 'AI'"
      within('.main-container') do
        expect(page).not_to have_content 'AI'
      end
    end
  end
end
