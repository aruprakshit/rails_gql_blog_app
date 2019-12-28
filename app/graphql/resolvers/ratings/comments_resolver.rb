module Resolvers
  module Ratings
    class CommentsResolver < BaseResolver
      def destroy(rating_id:, post_id:)
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

      def create(category:, comment_id:)
        comment = Comment.find(comment_id)
        rating = comment.ratings.build(
          category: category,
          user_id: @context[:current_user].id
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
