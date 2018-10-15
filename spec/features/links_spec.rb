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
                  order: 3, topic: create(:topic, name: 'Cars'))
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

    it 'can sort items by drag and drop' do
      pending('drag and drop with Capybara on headless firefox seems not to work')
      # also tested with headless chrome, does not work either
      link2 = create :link, order: 6, title: 'second_link', topic: create(:topic, name: 'Trees')
      page.driver.browser.navigate.refresh

      # This would be nice, but does not work
      # element = find('span', text: 'Trees')
      # target = find('span', text: 'Cars')
      # element.drag_to target


      # this is uglier but does not work either
      # element = page.driver.browser.find_element(xpath: "(//div[contains(@class, 'link')])[2]")
      element = page.driver.browser.find_element(xpath: "//span[contains(text(),'Trees')]")
      target = page.driver.browser.find_element(xpath: "//h2[contains(text(),'To do')]")
      # target = page.driver.browser.find_element(xpath: "//span[contains(text(),'Cars')]")
      # page.driver.browser.action.drag_and_drop(element, target).perform
      # page.driver.browser.action.drag_and_drop_by(element, 10, -150).perform

      selenium_webdriver = page.driver.browser
      selenium_webdriver.action.click_and_hold(element)
          .move_to(target)
          .release.perform

      sleep 1.5

      expect(Link.find(link.id).order).to eq 1
      expect(Link.find(link2.id).order).to eq 0
    end
  end
end
