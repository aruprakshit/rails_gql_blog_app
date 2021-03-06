class GraphqlController < ApplicationController
  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  # protect_from_forgery with: :null_session

  def execute
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      # Query context goes here, for example:
      current_user: current_user,
      sign_in: ->(user) { sign_in(user) },
    }
    result = GqlBlogAppSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue => e
    raise e unless Rails.env.development?
    handle_error_in_development e
  end

  private

  def sign_in(user)
    mitigate_session_fixation
    session['X-Auth-Id'] = user.auth_token
  end

  def mitigate_session_fixation
    old_values = session.to_hash
    reset_session
    session.update(old_values.except("session_id"))
  end

  def current_user
    puts "Auth ID: #{session['X-Auth-Id']}"
    User.find_by_auth_token(session['X-Auth-Id'])
  end

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { error: { message: e.message, backtrace: e.backtrace }, data: {} }, status: 500
  end
end

# https://www.justinweiss.com/articles/how-rails-sessions-work/
# https://medium.com/scaphold/authentication-in-graphql-25682de13787
# https://guides.rubyonrails.org/api_app.html#choosing-middleware
# https://api.rubyonrails.org/classes/ActionDispatch/Session/CookieStore.html
# https://api.rubyonrails.org/classes/ActionDispatch/Cookies.html
