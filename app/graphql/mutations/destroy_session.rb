module Mutations
  class DestroySession < GraphQL::Schema::Mutation
    field :message, String, null: true
    field :errors, [String, null: true], null: false

    def resolve()
      user = context[:current_user]
      puts "Context: #{user}"

      if user && user.regenerate_auth_token
        {
          message: "You are successfully logged out",
          errors: [],
        }
      else
        # Failed log out, return the errors to the client
        {
          user: nil,
          errors: ["We couldn't log you out. Something went wrong."]
        }
      end
    end
  end
end
