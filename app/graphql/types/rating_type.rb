module Types
  class RatingType < Types::BaseObject
    description "A community post"

    field :id,       ID, null: false
    field :category, RatingCategory, null: false
    field :rated_by, UserType, null: false, method: :user
    field :weight,   Integer, null: false
  end
end
