class User < ApplicationRecord
  validates :username, :email, uniqueness: true

  has_many :posts
  has_many :comments
  has_many :posts_by_comment, through: :comments
end
