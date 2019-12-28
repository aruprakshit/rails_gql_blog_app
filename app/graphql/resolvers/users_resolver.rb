module Resolvers
  class UsersResolver < BaseResolver
    def index
      User.all
    end

    def show(id:)
      User.find(id)
    end
  end
end
