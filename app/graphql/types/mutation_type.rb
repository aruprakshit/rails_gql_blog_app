module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::Users::CreateCommand
    field :create_post, mutation: Mutations::Posts::CreateCommand
  end
end
