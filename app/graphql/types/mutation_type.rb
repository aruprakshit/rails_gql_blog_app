module Types
  class MutationType < Types::BaseObject
    # sessions managment
    field :log_in,  mutation: Mutations::CreateSession
    field :log_out, mutation: Mutations::DestroySession

    # CRUD
    # users
    field :sign_up, mutation: Mutations::Users::CreateCommand

    # posts
    field :create_post, mutation: Mutations::Posts::CreateCommand
    field :update_post, mutation: Mutations::Posts::UpdateCommand

    # rate posts
    field :add_rating_to_post, mutation: Mutations::Posts::AddRatingCommand
    field :undo_rating_to_post, mutation: Mutations::Posts::RemoveRatingCommand

    # comments
    field :create_comment, mutation: Mutations::Comments::CreateCommand
    field :update_comment, mutation: Mutations::Comments::UpdateCommand

    # rate comments
    field :add_rating_to_comment, mutation: Mutations::Comments::AddRatingCommand
    field :undo_rating_to_comment, mutation: Mutations::Comments::RemoveRatingCommand
  end
end
