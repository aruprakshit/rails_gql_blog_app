module Types
  class UserType < Types::BaseObject
    description "A community member"

    field :id, ID, null: false
    field :username, String, null: false
    field :email, String, null: false
    field :gender, UserGender, null: true

    field :ownedPosts, [PostType], null: false, method: :posts
    field :postsCommentedOn, [PostType], null: false, method: :posts_by_comments
  end
end
