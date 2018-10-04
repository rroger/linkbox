# frozen_string_literal: true

FactoryBot.define do
  factory :link, class: 'Link' do
    topic { Topic.last || create(:topic) }
    url { Faker.url }
    title { Faker::Science.scientist }
    notes { Faker::Science.scenario }
  end
end
