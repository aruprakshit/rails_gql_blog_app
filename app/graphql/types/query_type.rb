module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :allUsers, [UserType], null: false, description: 'Fetch all users'
    field :user, UserType, null: true do
      description "Find a user by ID"
      argument :id, ID, required: true
    end


    field :allPosts, [PostType], null: false, description: 'Fetch all posts'
    field :post, PostType, null: true do
      description "Find a post by ID"
      argument :id, ID, required: true
    end

    # Then provide an implementation:
    def user(id:)
      User.find(id)
    end

    def all_users
      User.all
    end

    def all_posts
      Post.all
    end

    def post(id:)
      Post.find(id)
    end
  end
end
