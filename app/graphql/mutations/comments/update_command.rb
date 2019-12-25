module Mutations
  module Comments
    class UpdateCommand < GraphQL::Schema::Mutation
      description 'Update an existing post comment.'

      argument :body, String, required: true
      argument :postId, ID, required: true, as: :post_id
      argument :commentId, ID, required: true, as: :comment_id

      field :comment, Types::CommentType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'UpdateCommentCommand'
        end
      end

      def resolve(body:, post_id:, comment_id:)
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
    end
  end
end
