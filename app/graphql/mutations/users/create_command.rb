module Mutations
  module Users
    class CreateCommand < GraphQL::Schema::Mutation
      argument :email,    String, required: true
      argument :username, String, required: true
      argument :password, String, required: true

      field :user, Types::UserType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'CreateUserCommand'
        end
      end

      def resolve(email:, username:, password:)
        Resolvers::UsersResolver
          .new(context, authenticate: false)
          .create(email: email, username: username, password: password)
      end
    end
  end
end
