class Api::RoleController < ApplicationController
  respond_to :json
  def show
    respond_with Role.find(params[:id])
  end

  def index
    respond_with Role.all
  end


  def create
    role = Role.new(role_params)
    if role.save
      render json: role, status: 201, location: [:api, role]
    else
      render json: { errors: role.errors }, status: 422
    end
  end

  def destroy
    #User.delete(params[:id])
    role = Role.find(params[:id])
    if role.destroy
      render json: role, status: 201, location: [:api, role]
    else
      render json: { errors: role.errors }, status: 422
    end
    #respond_with user, :location => all_users_index_url
  end

  def update
    #User.delete(params[:id])
    role = Role.find(params[:id])
    role.update(role_params)
    if role.save
      render json: role, status: 201, location: [:api, role]
    else
      render json: { errors: role.errors }, status: 422
    end
  end

  private

  def role_params
    params.require(:role).permit(:name)
  end
end
