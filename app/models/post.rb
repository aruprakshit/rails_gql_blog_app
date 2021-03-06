class Post < ApplicationRecord
  belongs_to :user

  has_many :comments
  has_many :ratings, as: :rateable

  validates :body, presence: true
end
