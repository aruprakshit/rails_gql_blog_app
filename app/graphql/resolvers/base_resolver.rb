module Resolvers
  class BaseResolver
    def initialize(context, authenticate: true)
      @context = context
      authenticate_user! if authenticate
    end

    private

    def authenticate_user!
      if @context[:current_user].blank?
        raise GraphQL::ExecutionError.new("Please login before continue", extensions: { "code" => "UNAUTHORIZED" })
      end
    end
  end
end
