# frozen_string_literal: true

FactoryBot.define do
  factory :link, class: 'Link' do
    topic_id ''
    url 'MyString'
    title 'MyString'
    notes 'MyText'
  end
end
