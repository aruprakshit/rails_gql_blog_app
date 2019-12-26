class Rating < ApplicationRecord
  CATEGORIES = %w(upvote downvote).freeze
  WEIGHTS = {
    'upvote' => 5,
    'downvote' => -1
  }.freeze

  before_validation :assign_weight

  validates :category, inclusion: { in: CATEGORIES,
    message: "%{value} is not a valid category" }

  validates :category, :weight, presence: true

  belongs_to :user
  belongs_to :rateable, polymorphic: true


  private

  def assign_weight
    self.weight = self.category === CATEGORIES[0] ? WEIGHTS['upvote'] : WEIGHTS['downvote']
  end
end
