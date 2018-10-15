# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Links', :js do
  it 'can visit library page' do
    visit '/#/library'

    expect(page).to have_content 'To do'
    expect(page).to have_content 'Completed'
  end

  context 'with existing links' do
    let!(:link) do
      create(:link, title: 'topics', url: 'http://localhost:5001/#/library',
                    topic: create(:topic, name: 'Cars'))
    end

    before { visit '/#/library' }

    it 'can display links' do
      expect(page).to have_content link.title
      expect(page).to have_content link.topic.name
    end

    it 'displays notes when clicked' do
      find('span', text: 'NOTES', match: :first).click

      expect(page).to have_content link.notes
    end

    it 'links url to link title with target _blank' do
      click_on link.title

      expect(current_url).to match 'http://localhost:5001/#/library'
      # https://github.com/teamcapybara/capybara#working-with-windows would be nice,
      # but it does not work
    end
  end
end
