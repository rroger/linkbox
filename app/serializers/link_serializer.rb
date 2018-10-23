# frozen_string_literal: true

class LinkSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :url, :notes, :order, :completed

  attribute :topic_name do |object|
    object.topic&.name
  end

  attribute :topic_id do |object|
    object.topic&.id
  end

  attribute :topic_color do |object|
    object.topic&.color
  end
end
