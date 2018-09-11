# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Topics page', :js do
  let!(:topics) { create_list(:topic, 5) }

  it 'can list topics' do
    visit root_path

    topics.each do |topic|
      expect(page).to have_content topic.name
    end
  end
end
