# frozen_string_literal: true

class Topic < ApplicationRecord
  validates :name, presence: true
  has_many :links, dependent: :nullify
  scope :default_ordered, -> { order(name: :asc) }

  def color
    "##{Digest::MD5.hexdigest(name)[0...6]}"
  end
end
