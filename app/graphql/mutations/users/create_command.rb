module Mutations
  module Users
    class CreateCommand < GraphQL::Schema::Mutation
      argument :email,    String, required: true
      argument :username, String, required: true
      argument :gender,   Types::UserGender, required: true

      field :user, Types::UserType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'CreateUserCommand'
        end
      end

      def resolve(email:, username:, gender:)
        user = User.new(
          email: email,
          username: username,
          gender: gender
        )

        if user.save
          # Successful creation, return the created object with no errors
          {
            user: user,
            errors: [],
          }
        else
          # Failed save, return the errors to the client
          {
            user: nil,
            errors: user.errors.full_messages
          }
        end
      end
    end
  end
end
