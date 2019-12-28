module Resolvers
  class CommentsResolver < BaseResolver
    def update(body:, post_id:, comment_id:)
      post = Post.find(post_id)
      comment = post.comments.find(comment_id)

      if comment.update(body: body)
        # Successful creation, return the created object with no errors
        {
          comment: comment,
          errors: [],
        }
      else
        # Failed save, return the errors to the client
        {
          comment: nil,
          errors: comment.errors.full_messages
        }
      end
    end

    def create(body:, post_id:)
      post = Post.find(post_id)
        comment = post.comments.build(
          body: body,
          user_id: @context[:current_user].id
        )

        if comment.save
          # Successful creation, return the created object with no errors
          {
            comment: comment,
            errors: [],
          }
        else
          # Failed save, return the errors to the client
          {
            comment: nil,
            errors: comment.errors.full_messages
          }
        end
    end
  end
end
