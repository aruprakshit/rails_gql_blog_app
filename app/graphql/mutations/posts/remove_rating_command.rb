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
        post = Post.find(post_id)
        rating = post.ratings.find(rating_id)

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
