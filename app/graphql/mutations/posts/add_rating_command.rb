module Mutations
  module Posts
    class AddRatingCommand < GraphQL::Schema::Mutation
      description 'Add rating to an existing post.'

      argument :category, Types::RatingCategory, required: true
      argument :postId, ID, required: true, as: :post_id

      field :rating, Types::RatingType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'AddRatingPostCommand'
        end
      end

      def resolve(category:, post_id:)
        Resolvers::Ratings::PostsResolver
          .new(context)
          .create(category: category, post_id: post_id)
      end
    end
  end
end
