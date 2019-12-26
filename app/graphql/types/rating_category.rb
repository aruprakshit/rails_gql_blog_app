module Types
  class RatingCategory < Types::BaseEnum
    value "UPVOTE", value: Rating::CATEGORIES[0]
    value "DOWNVOTE", value: Rating::CATEGORIES[1]
  end
end
