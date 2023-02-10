# frozen_string_literal: true

class Link < ApplicationRecord
  validates :title, :url, presence: true
  belongs_to :topic, optional: true
end
