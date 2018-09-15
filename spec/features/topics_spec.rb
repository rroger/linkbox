# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Topics page', :js do
  let!(:topics) { [create(:topic, name: 'AI'), create(:topic, name: 'Style')] }

  before { visit root_path }
  it 'can list topics' do
    topics.each do |topic|
      expect(page).to have_content topic.name
    end
  end

  it 'can add a topic' do
    find(:css, "button[data-test='add-button']").click
    fill_in 'topic-name', with: 'TopicSoNew'
    find(:css, '.save-button').click

    expect(page).to have_content 'TopicSoNew'
    expect(Topic.count).to be 3
  end

  it 'can edit a topic' do
    find_all("button[data-test='topic-edit-button']").first.click
    fill_in 'topic-name', with: 'TopicSoEdited'
    find(:css, '.save-button').click

    expect(Topic.count).to be 2
    expect(page).to have_content 'TopicSoEdited'
    expect(page).to_not have_content 'AI'
  end

  it 'can delete a topic' do
    find_all("button[data-test='topic-edit-button']").first.click
    find(:css, "button[data-test='delete-button']").click
    find(:css, "button[data-test='confirm-button']").click

    expect(find_all("span[data-test='index-topic-name']", text: 'AI').count).to be 0
    expect(Topic.count).to be 1
    expect(page).to have_content "Successfully deleted Topic 'AI'"
  end
end
