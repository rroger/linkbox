# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'fast_jsonapi'
gem 'figaro'
gem 'jbuilder', '~> 2.5'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'rails', '~> 5.2.1'
gem 'seed_box'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'capybara-screenshot'
  gem 'execjs'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'pry-rails'
  gem 'rubocop', '~> 0.58.2', require: false
  gem 'geckodriver-helper'
  gem 'mdl', require: false
  gem 'pry-rails'
  gem 'reek', require: false
  gem 'rspec-rails', '~> 3.7'
  gem 'rubocop', '~> 0.58.2', require: false
  gem 'rubocop-rspec', require: false
  gem 'scss_lint', require: false
  gem 'selenium-webdriver'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
