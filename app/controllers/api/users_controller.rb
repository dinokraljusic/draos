class Api::UsersController < ApplicationController
  respond_to :json, :html

  #needed for user signup stats on admin page
  def user_signup_freq
    users = User.find_by_sql("select count(*) count, date(created_at) created_at from users group by date(created_at)")
    respond_with users.to_json :methods => :count
  end

  def show
    #respond_with User.find(params[:id])
    user = User.find(params[:id])
=begin
    respond_to do |format|
      format.html
      format.json { render json: user }
    end
=end
    respond_with user
  end

  def index
    respond_with User.all.to_json :methods => :sign_in_count
  end

  def create
      user = User.new(user_params)
      captcha_message = "The data you entered for the CAPTCHA wasn't correct.  Please try again"
      if verify_recaptcha(model: user, message: captcha_message)
        if user.save
          user.send_activation_email
          respond_to do |format|
            format.html { redirect_to root_path}
            format.json { render json: user, status: 201, location: [:api, user]}
          end
        else
         render json: { errors: user.errors }, status: 422
        end
      else render 'static_pages/index'
      end
  end

  def destroy
    #User.delete(params[:id])
    user = User.find(params[:id])
    if user.destroy
      render json: user, status: 201, location: [:api, user]
    else
      render json: { errors: user.errors }, status: 422
    end
    #respond_with user, :location => all_users_index_url
  end

  def update
    #User.delete(params[:id])
    user = User.find(params[:id])
    user.update(user_params)
    if user.save
      respond_to do |format|
        format.html { redirect_to root_path}
        format.json { render json: user, status: 201, location: [:api, user]}
      end
      #render json: user, status: 201, location: [:api, user]
    else
      render json: { errors: user.errors }, status: 422
    end
  end

  def new
    @user = User.new
    respond_to do |format|
      format.html #{ render :partial => 'new'}
      format.json {render :json => @user}
    end
  end

  def edit
    if current_user
      @user=current_user
      render :partial => 'edit'
    else
      flash.now[:danger]="Not logged in!"
    end
  end

  def authenticate
    user = User.find_by(email: params[:email].downcase)
    if user && user.authenticate(params[:password])
      token = SessionsHelper.issue_token({ user_id: user.id })
      render json: { user: user,
                     token: token }
    else
      render json: { error: "Invalid email/password combination" }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name, :lastname, :username, :role_id, :active, :sign_in_count)
  end


end
