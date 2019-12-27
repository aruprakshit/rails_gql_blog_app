class ApplicationController < ActionController::API
  # include ActionView::Layouts

  # Avoid having an empty view file.
  def index
    # ActionView::Layouts.render inline: "", layout: 'application'
    send_file "#{Rails.root}/public/application.html" , type: 'text/html; charset=utf-8', disposition: 'inline'
  end
end
