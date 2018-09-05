# frozen_string_literal: true

class Topic < ApplicationRecord
  validates_presence_of :name
end
