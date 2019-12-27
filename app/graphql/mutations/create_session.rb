module Mutations
  class CreateSession < GraphQL::Schema::Mutation
    argument :email,    String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [String, null: true], null: false

    def resolve(email:, password:)
      user = User.find_by(email: email)

      if user && user.authenticate(password)
        context[:sign_in].call(user) # Logged in user
        # Successful creation, return the created object with no errors
        {
          user: user,
          errors: [],
        }
      else
        # Failed save, return the errors to the client
        {
          user: nil,
          errors: ['Invalid email or password']
        }
      end
    end
  end
end
