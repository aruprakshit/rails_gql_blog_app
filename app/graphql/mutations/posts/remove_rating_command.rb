module Mutations
  module Posts
    class RemoveRatingCommand < GraphQL::Schema::Mutation
      description 'Remove rating from an existing post.'

      argument :postId, ID, required: true, as: :post_id
      argument :ratingId, ID, required: true, as: :rating_id

      field :rating, Types::RatingType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'RemoveRatingPostCommand'
        end
      end

      def resolve(rating_id:, post_id:)
        Resolvers::Ratings::PostsResolver
          .new(context)
          .destroy(rating_id: rating_id, post_id: post_id)
      end
    end
  end
end
