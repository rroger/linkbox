# frozen_string_literal: true

class Topic < ApplicationRecord
  validates :name, presence: true
  has_many :links
  scope :default_ordered, -> { order(name: :asc) }
end
