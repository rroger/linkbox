# frozen_string_literal: true

FactoryBot.define do
  factory :link, class: 'Link' do
    topic { create(:topic) }
    url { Faker::Internet.url }
    title { Faker::Science.scientist }
    notes { Faker::Lorem.sentence }
  end
end
