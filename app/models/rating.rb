class Rating < ApplicationRecord
  CATEGORIES = %w(upvote downvote).freeze
  WEIGHTS = {
    'upvote' => 5,
    'downvote' => -1
  }.freeze

  validates :category, inclusion: { in: CATEGORIES,
    message: "%{value} is not a valid category" }

  validates :category, :weight, presence: true

  belongs_to :user
  belongs_to :rateable, polymorphic: true
end
