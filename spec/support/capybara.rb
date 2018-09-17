# frozen_string_literal: true

require 'capybara-screenshot/rspec'

Capybara.register_driver :firefox_headless do |app|
  options = ::Selenium::WebDriver::Firefox::Options.new
  options.args << '--headless'
  Capybara::Selenium::Driver.new(app, browser: :firefox, options: options)
end
Capybara.register_driver :firefox do |app|
  Capybara::Selenium::Driver.new(app, browser: :firefox)
end
Capybara.javascript_driver = (ENV['JS_DRIVER'] || :firefox_headless).to_sym
# From https://github.com/mattheworiordan/capybara-screenshot/issues/84#issuecomment-41219326
Capybara::Screenshot.register_driver(:firefox_headless) do |driver, path|
  driver.browser.save_screenshot(path)
end
