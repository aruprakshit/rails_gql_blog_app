module Mutations
  module Comments
    class RemoveRatingCommand < GraphQL::Schema::Mutation
      description 'Remove rating from a comment on an existing post.'

      argument :commentId, ID, required: true, as: :comment_id
      argument :ratingId, ID, required: true, as: :rating_id

      field :rating, Types::RatingType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'RemoveRatingCommentCommand'
        end
      end

      def resolve(rating_id:, comment_id:)
        comment = Comment.find(comment_id)
        rating = comment.ratings.find(rating_id)

        if rating.destroy
          # Successful creation, return the created object with no errors
          {
            rating: rating,
            errors: [],
          }
        else
          # Failed save, return the errors to the client
          {
            rating: nil,
            errors: rating.errors.full_messages
          }
        end
      end
    end
  end
end
