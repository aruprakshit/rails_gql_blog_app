module Resolvers
  class PostsResolver < BaseResolver
    def index
      Post.all
    end

    def show(id:)
      Post.find(id)
    end
  end
end
