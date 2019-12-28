module Resolvers
  class PostsResolver < BaseResolver
    def index
      Post.all
    end

    def show(id:)
      Post.find(id)
    end

    def create(body:)
      post = Post.new(
        body: body,
        user_id: @context[:current_user].id
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

    def update(body:, post_id:)
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
