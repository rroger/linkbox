# frozen_string_literal: true

class LinkSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :url, :notes, :order, :completed

  attribute :topic do |object|
    object.topic&.name
  end
end
