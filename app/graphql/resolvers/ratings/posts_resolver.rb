module Resolvers
  module Ratings
    class PostsResolver < BaseResolver
      def destroy(rating_id:, post_id:)
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

      def create(category:, post_id:)
        post = Post.find(post_id)
        rating = post.ratings.build(
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
