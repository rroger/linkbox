# frozen_string_literal: true

class TopicSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
end
