module Types
  class PostType < Types::BaseObject
    description "A community post"

    field :id, ID, null: false
    field :body, String, null: false
    field :owner, UserType, null: false, method: :user
    field :comments, [CommentType], null: false
    field :ratings, [RatingType], null: false
  end
end
