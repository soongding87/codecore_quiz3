class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new user_params

    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = "Thank you, #{@user.first_name}, for signing up!"
      redirect_to home_path
    else
      render :new
    end
  end

  def show
    @user = User.find params[:id]
  end

  private
  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation,
      :resume,
      :address
    )
  end
end
