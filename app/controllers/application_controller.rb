class ApplicationController < ActionController::API
  include ActionView::Layouts

  #before_action :handle_html_requests

  # Avoid having an empty view file.
  def index
    render inline: "", layout: 'application'
  end

  private

  # Required for initial page load so that the entire app isn't served as json
  def handle_html_requests
    render "layouts/application" if request.format.symbol == :html
  end
end
