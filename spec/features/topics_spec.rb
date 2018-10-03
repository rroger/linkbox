# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Topics page', :js do
  it 'can add a topic' do
    visit '/#/topics'
    find(:css, "button[data-test='add-button']").click
    fill_in 'topic-name', with: 'TopicSoNew'
    click_on 'Save'

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
      find_button('EDIT', match: :first).click
      fill_in 'topic-name', with: 'TopicSoEdited'
      click_on 'Save'

      expect(Topic.count).to be 2
      expect(page).to have_content 'TopicSoEdited'
      expect(page).to_not have_content 'AI'
    end

    it 'can delete a topic' do
      find_button('EDIT', match: :first).click
      find(:css, "button[data-test='delete-button']").click
      find(:css, "button[data-test='confirm-button']").click

      expect(find_all("span[data-test='index-topic-name']", text: 'AI').count).to be 0
      expect(Topic.count).to be 1
      expect(page).to have_content "Successfully deleted Topic 'AI'"
    end
  end
end
