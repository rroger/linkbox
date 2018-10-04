# frozen_string_literal: true

class LinkSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :url, :notes, :topic, :order, :completed
end
