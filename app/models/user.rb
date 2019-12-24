class User < ApplicationRecord
  validates :username, :email, uniqueness: true

  has_many :posts
end
