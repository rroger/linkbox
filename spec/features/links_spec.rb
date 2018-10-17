# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Links', :js do
  it 'can visit library page' do
    visit '/#/library'

    expect(page).to have_content 'To do'
    expect(page).to have_content 'Completed'
  end

  it 'can add new links', :js do
    create(:topic, name: 'Topic new')
    visit '/#/library'
    fill_in 'Link Title', with: 'Zeit'
    fill_in 'link-url', with: 'https://zeit.de'
    fill_in 'Notes', with: 'some notes'
    select 'Topic new', from: 'link-topic'
    click_button 'Save'
    find('a', text: 'NOTES', exact_text: false).click

    expect(page).to have_content 'Topic new'
    expect(page).to have_link('Zeit', href: 'https://zeit.de')
    expect(page).to have_content 'some notes'
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

      expect(current_url).to eq 'http://localhost:5001/#/library'
      # https://github.com/teamcapybara/capybara#working-with-windows would be nice,
      # but it does not work
    end

    it 'has a working complete button for a link' do
      within('.completed-section') do
        expect(page).not_to have_content 'Architecture'
      end
      click_button 'COMPLETE'

      within('.completed-section') do
        find('.expand-completed').click

        expect(page).to have_content 'Architecture'
      end
      within('.todo-section') do
        expect(page).not_to have_content 'Architecture'
      end
    end
  end
end
