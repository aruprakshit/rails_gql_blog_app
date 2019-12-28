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
        Resolvers::Ratings::CommentsResolver
          .new(context)
          .destroy(rating_id: rating_id, comment_id: comment_id)
      end
    end
  end
end
