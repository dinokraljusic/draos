module SessionsHelper
  # Logs in the given user.
  def log_in(user)
    session[:user_id] = user.id
    user.update_login_params
  end

  # Returns the current logged-in user (if any).
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  # Returns true if the user is logged in, false otherwise.
  def logged_in?
    !current_user.nil?
  end

  def is_restaurant
    !current_user.nil? && current_user.isRestaurant?
  end

  def is_admin
    !current_user.nil? && current_user.isAdmin?
  end

  # Logs out the current user.
  def log_out
    current_user.update_logout_params
    session.delete(:user_id)
    @current_user = nil
  end

  def SessionsHelper.issue_token(user)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def SessionsHelper.valid?(token)
    begin
      JWT.decode(token, Rails.application.secrets.secret_key_base)
    rescue
      false
    end
  end

end
