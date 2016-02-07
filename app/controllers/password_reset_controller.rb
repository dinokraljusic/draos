class PasswordResetController < ApplicationController
  before_action :get_user,         only: [:edit]
  before_action :check_expiration, only: [:edit]
  def new
    render :partial => 'new';
  end

  def edit
  end

  def create
    user = User.find_by(email: params[:password_reset][:email].downcase)
    if user
      user.create_reset_digest
      user.send_password_reset_email
      flash.now[:info] = 'Email sent with password reset instructions'
      redirect_to root_url
    else
      flash.now[:danger] = 'Email address not found'
      render 'new'
    end
  end

  def update
    @user = User.find_by(email: params[:user][:email].downcase)
    if password_blank?
      flash.now[:danger] = "Password can't be blank"
      render 'edit'
    elsif @user.update_attributes(user_params)
      log_in @user
      flash.now[:success] = "Password has been reset."
      redirect_to root_path
    else
      render 'edit'
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  # Returns true if password is blank.
  def password_blank?
    params[:user][:password].blank?
  end

  # Before filters

  def get_user
    token = params[:jwt]
    payload, header =JWT.decode(token, Rails.application.secrets.secret_key_base)
    @user = User.find_by(id: payload['user_id'])
   # @user = User.find_by(2)
  end

  # Checks expiration of reset token.
  def check_expiration
    if @user.password_reset_expired?
      flash[:danger] = "Password reset has expired."
      redirect_to new_password_reset_url
    end
  end
end
