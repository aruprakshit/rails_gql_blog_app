module Mutations
  module Comments
    class AddRatingCommand < GraphQL::Schema::Mutation
      description 'Add rating to a comment on an existing post.'

      argument :category, Types::RatingCategory, required: true
      argument :commentId, ID, required: true, as: :comment_id

      field :rating, Types::RatingType, null: true
      field :errors, [String, null: true], null: false

      class << self
        def name
          'AddRatingCommentCommand'
        end
      end

      def resolve(category:, comment_id:)
        Resolvers::Ratings::CommentsResolver
          .new(context)
          .create(category: category, comment_id: comment_id)
      end
    end
  end
end
