class SessionsController < ApplicationController
  before_action :get_user,         only: [:new]
  #before_action :check_expiration, only: [:new]
  def new
    render :partial => 'new'
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.active && user.valid_password?(params[:session][:password])
      log_in user
      #redirect_to user_url(user)
      redirect_to root_url
    else
      # Create an error message.
      flash.now[:danger] = 'Invalid email/password combination'
      render 'static_pages/index' #
    #  render :partial => 'new'
      #redirect_to login_url
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end

  private

  def get_user
    token = params[:jwt]
    if(token!=nil)
      payload, header =JWT.decode(token, Rails.application.secrets.secret_key_base)
      @user = User.find_by(id: payload['user_id'])
      unless @user==nil
        @user.update_attribute('active', true);
        # @user = User.find_by(2)
      end
    end
  end

  # Checks expiration of reset token.
  def check_expiration
    if @user.password_reset_expired?
      flash[:danger] = "Activation time has expired."
      redirect_to signup_url
    end
  end
end
