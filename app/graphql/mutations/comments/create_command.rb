module Mutations
  module Comments
    class CreateCommand < GraphQL::Schema::Mutation
      description 'Create a comment on an existing post.'

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
        Resolvers::CommentsResolver
          .new(context)
          .create(body: body, post_id: post_id)
      end
    end
  end
end
