class User < ApplicationRecord
  has_secure_token :auth_token
  has_secure_password

  validates :username, :email, uniqueness: true

  has_many :posts
  has_many :comments
  has_many :posts_by_comments, through: :comments, source: :post
end
