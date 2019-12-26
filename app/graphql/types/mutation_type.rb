module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::Users::CreateCommand

    field :create_post, mutation: Mutations::Posts::CreateCommand
    field :update_post, mutation: Mutations::Posts::UpdateCommand
    field :add_rating_to_post, mutation: Mutations::Posts::AddRatingCommand

    field :create_comment, mutation: Mutations::Comments::CreateCommand
    field :update_comment, mutation: Mutations::Comments::UpdateCommand
    field :add_rating_to_comment, mutation: Mutations::Comments::AddRatingCommand
  end
end
