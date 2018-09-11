# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Topics page', :js do
  let!(:topics) { create_list(:topic, 5) }

  before { visit root_path }
  it 'can list topics' do
    topics.each do |topic|
      expect(page).to have_content topic.name
    end
  end

  it 'can add a topic' do
    find(:css, '.topics-add').click
    fill_in 'topic-name', with: 'TopicSoNew'
    find(:css, '.save-button').click

    expect(page).to have_content 'TopicSoNew'
    expect(Topic.count).to be 6
  end

  it 'can edit a topic' do
    find_all(:css, '.edit-button').first.click
    old_topic_name = find_field('topic-name').value
    fill_in 'topic-name', with: 'TopicSoEdited'
    find(:css, '.save-button').click

    expect(Topic.count).to be 5
    expect(page).to have_content 'TopicSoEdited'
    expect(page).to_not have_content old_topic_name
  end

  it 'can delete a topic' do
    find_all(:css, '.edit-button').first.click
    old_topic_name = find_field('topic-name').value
    find(:css, "button[data-test='delete-button']").click

    expect(Topic.count).to be 4
    expect(page).to_not have_content old_topic_name
  end
end
