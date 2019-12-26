module Types
  class CommentType < Types::BaseObject
    description "A community post comment"

    field :id, ID, null: false
    field :body, String, null: false
    field :owner, UserType, null: false, method: :user
    field :post, PostType, null: false
    field :ratings, [RatingType], null: false
  end
end
