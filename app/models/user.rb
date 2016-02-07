class User < ActiveRecord::Base
  has_many :rating
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Sends password reset email.
  def send_password_reset_email
    UserMailer.password_reset(self).deliver_now
  end

  def isRestaurant?
    role_id == 2
  end

  def isAdmin?
    role_id == 1
  end

  # Sets the password reset attributes.
  def create_reset_digest
    update_attribute(:reset_password_sent_at, Time.zone.now)
  end

  def generate_token
    JWT.encode({ user_id: id }, Rails.application.secrets.secret_key_base)
  end


  def send_activation_email
    UserMailer.activate_account(self).deliver_now
  end


  def password_reset_expired?
    reset_password_sent_at < 2.hours.ago
  end

  def update_login_params
    update_attribute(:sign_in_count, sign_in_count+1)
    update_attribute(:current_sign_in_at, Time.zone.now)
  end

  def update_logout_params
    update_attribute(:last_sign_in_at, current_sign_in_at)
    update_attribute(:current_sign_in_at, nil)
  end
end
