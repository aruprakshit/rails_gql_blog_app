module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::Users::CreateCommand
    field :create_post, mutation: Mutations::Posts::CreateCommand
    field :update_post, mutation: Mutations::Posts::UpdateCommand
    field :create_comment, mutation: Mutations::Comments::CreateCommand
  end
end
