class SessionsController < ApplicationController
  skip_before_action :authenticate

  # POST /sessions
  def create
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: @user, status: :ok
    else
      render json: { error: "Wrong email/password." }, status: :unathorized
    end
  end

  # DELETE /logout
  def destroy
    session.delete(:user_id)
  end
end
