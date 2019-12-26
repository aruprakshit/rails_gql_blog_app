module Mutations
  module Comments
    class AddRatingCommand < GraphQL::Schema::Mutation
      description 'Create a comment on an existing post.'

      argument :category, Types::RatingCategory, required: true
      argument :commentId, ID, required: true, as: :comment_id

      field :rating, Types::RatingType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'AddRatingCommentCommand'
        end
      end

      def resolve(category:, comment_id:)
        comment = Comment.find(comment_id)
        rating = comment.ratings.build(
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
