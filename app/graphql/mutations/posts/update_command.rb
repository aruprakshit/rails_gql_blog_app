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
        post = Post.find(post_id)

        if post.update(body: body)
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
