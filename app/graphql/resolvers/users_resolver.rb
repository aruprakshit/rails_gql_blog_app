module Resolvers
  class UsersResolver < BaseResolver
    def index
      User.all
    end

    def show(id:)
      User.find(id)
    end

    def create(email:, username:, password:)
      user = User.new(
        email: email,
        username: username,
        password: password
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
