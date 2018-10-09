# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Links', :js do
  it 'can visit library page' do
    visit '/#/library'

    expect(page).to have_content 'To do'
    expect(page).to have_content 'Completed'
  end
end
