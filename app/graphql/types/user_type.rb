module Types
  class UserType < Types::BaseObject
    description "A community member"

    field :id, ID, null: false
    field :username, String, null: false
    field :email, String, null: false
    field :gender, UserGender, null: false

    field :ownedPosts, [PostType, null: true], null: false, method: :posts
  end
end