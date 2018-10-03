# frozen_string_literal: true

class Topic < ApplicationRecord
  validates :name, presence: true
  scope :default_ordered, -> { order(name: :asc) }
end
