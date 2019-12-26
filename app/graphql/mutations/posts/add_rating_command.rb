module Mutations
  module Posts
    class AddRatingCommand < GraphQL::Schema::Mutation
      description 'Create a comment on an existing post.'

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
        post = Post.find(post_id)
        rating = post.ratings.build(
          category: category,
          user_id: context[:current_user].id
        )

        if rating.save
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
