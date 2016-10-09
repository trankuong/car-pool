class ApplicationController < ActionController::API

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authenticate
    render json: { errors: ["Please sign in."] } unless current_user
  end
end
