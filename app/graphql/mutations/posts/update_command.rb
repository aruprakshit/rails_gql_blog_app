module Mutations
  module Posts
    class UpdateCommand < GraphQL::Schema::Mutation
      argument :body, String, required: true
      argument :postId, ID, required: true, as: :post_id

      field :post, Types::PostType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'UpdatePostCommand'
        end
      end

      def resolve(body:, post_id:)
        Resolvers::PostsResolver
          .new(context)
          .update(body: body, post_id: post_id)
      end
    end
  end
end
