# frozen_string_literal: true

class Topic < ApplicationRecord
  validates :name, presence: true
end
