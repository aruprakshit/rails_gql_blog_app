module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # Users resources
    field :allUsers, [UserType], null: false, description: 'Fetch all users'
    field :user, UserType, null: true do
      description "Find a user by ID"
      argument :id, ID, required: true
    end
    field :me, UserType, null: false, description: 'Dispay logged in user details'

    def user(id:)
      Resolvers::UsersResolver.new(context).show(id: id)
    end

    def me
      Resolvers::UsersResolver.new(context, authenticate: false).show(id: context[:current_user].id)
    end

    def all_users
      Resolvers::UsersResolver.new(context).index
    end

    # Posts resources
    field :allPosts, [PostType], null: false, description: 'Fetch all posts'
    field :post, PostType, null: true do
      description "Find a post by ID"
      argument :id, ID, required: true
    end

    def all_posts
      Resolvers::PostsResolver.new(context).index
    end

    def post(id:)
      Resolvers::PostsResolver.new(context).show(id: id)
    end
  end
end
