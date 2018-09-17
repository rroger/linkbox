# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Landing page', :js do
  it 'can visit root page' do
    visit root_path

    expect(page).to have_content 'Some text'
  end
end
