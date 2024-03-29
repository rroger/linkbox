# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'bootsnap', require: false
gem 'fast_jsonapi'
gem 'jbuilder', '~> 2.5'
gem 'pg'
gem 'puma', '~> 3.7'
gem 'rails', '~> 6.1.7.1'
gem 'seed_box'
gem 'uglifier', '>= 1.3.0'

group :development, :test do
  gem 'brakeman', require: false
  gem 'bundler-audit', require: false
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'capybara-screenshot'
  gem 'dotenv-rails'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'foreman'
  gem 'geckodriver-helper'
  gem 'jsbundling-rails'
  gem 'mdl', require: false
  gem 'pry-rails'
  gem 'reek', require: false
  gem 'rspec-rails', '~> 3.7'
  gem 'rubocop', '~> 0.58.2', require: false
  gem 'rubocop-rspec', require: false
  gem 'scss_lint', require: false
  gem 'selenium-webdriver'
  gem 'spring-commands-rspec'
end

group :development do
  gem "better_errors"
  gem "binding_of_caller"
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'database_cleaner'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
