module Mutations
  module Posts
    class CreateCommand < GraphQL::Schema::Mutation
      argument :body, String, required: true

      field :post, Types::PostType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'CreatePostCommand'
        end
      end

      def resolve(body:)
        Resolvers::PostsResolver.new(context).create(body: body)
      end
    end
  end
end
