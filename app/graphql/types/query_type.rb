module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # First describe the field signature:
    field :user, UserType, null: true do
      description "Find a user by ID"
      argument :id, ID, required: true
    end

    field :allUsers, [UserType, null: true], null: false

    # Then provide an implementation:
    def user(id:)
      User.find(id)
    end

    def all_users
      User.all
    end
  end
end
