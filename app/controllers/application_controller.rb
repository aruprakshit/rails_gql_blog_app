class ApplicationController < ActionController::API
  # include ActionView::Layouts

  # Avoid having an empty view file.
  def index
    # ActionView::Layouts.render inline: "", layout: 'application'
    # send_file "#{Rails.root}/public/application.html" , type: 'text/html; charset=utf-8', disposition: 'inline'
    # https://stackoverflow.com/questions/43911928/how-to-render-file-in-rails-5-api
    render plain: File.read(Rails.root.join('public', 'application.html')), layout: false
  end
end
