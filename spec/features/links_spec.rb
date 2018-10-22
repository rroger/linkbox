# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Links', :js do
  it 'can visit library page' do
    visit '/#/library'

    expect(page).to have_content 'To do'
    expect(page).not_to have_content 'Completed'
  end

  it 'have title "Completed" with completed links' do
    create(:link, title: 'Archictecture', completed: true)
    visit '/#/library'

    expect(page).to have_content 'Completed'
  end

  context 'with existing links' do
    let!(:link) do
      create(:link, title: 'Architecture', url: 'http://localhost:5001/#/library',
                    notes: 'Very good resource', order: 3, topic: create(:topic, name: 'Cars'))
    end

    before { visit '/#/library' }

    it 'can display links' do
      expect(page).to have_content 'Architecture'
      expect(page).to have_content 'Cars'
    end

    it 'displays notes when clicked' do
      find('a', text: 'NOTES', exact_text: false).click

      expect(page).to have_content 'Very good resource'
    end

    it 'links url to link title with target _blank' do
      click_on link.title

      expect(current_url).to match 'http://localhost:5001/#/library'
      # https://github.com/teamcapybara/capybara#working-with-windows would be nice,
      # but it does not work
    end
  end
end
