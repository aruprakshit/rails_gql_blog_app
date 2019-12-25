module Mutations
  module Comments
    class CreateCommand < GraphQL::Schema::Mutation
      argument :body, String, required: true
      argument :postId, ID, required: true, as: :post_id

      field :comment, Types::CommentType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'CreateCommentCommand'
        end
      end

      def resolve(body:, post_id:)
        post = Post.find(post_id)
        comment = post.comments.build(
          body: body,
          user_id: context[:current_user].id
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
end
