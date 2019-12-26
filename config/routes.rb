Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root "application#index"

  # Catch all for HTML 5 history routing. This must be the last route.
  get "/*path", to: "application#index", format: false
end
