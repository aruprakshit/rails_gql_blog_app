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
        Resolvers::CommentsResolver
          .new(context)
          .update(body: body, post_id: post_id, comment_id: comment_id)
      end
    end
  end
end
