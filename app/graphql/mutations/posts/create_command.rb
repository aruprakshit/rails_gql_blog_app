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
        post = Post.new(
          body: body,
          user_id: context[:current_user].id
        )

        if post.save
          # Successful creation, return the created object with no errors
          {
            post: post,
            errors: [],
          }
        else
          # Failed save, return the errors to the client
          {
            post: nil,
            errors: post.errors.full_messages
          }
        end
      end
    end
  end
end
