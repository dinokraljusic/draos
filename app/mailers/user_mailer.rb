class UserMailer < ApplicationMailer
  def password_reset(user)
    @user = user
    mail to: user.email, subject: "Reset lozinke"
  end

  def activate_account(user)
    @user = user
    mail to: user.email, subject: "Aktivacija nwt1"
  end
end
