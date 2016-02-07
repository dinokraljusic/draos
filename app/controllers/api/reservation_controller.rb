class Api::ReservationController < ApplicationController
  respond_to :json
=begin
  def show
    respond_with Reservation.find(params[:id])
  end
=end
  def show
    render :partial => 'api/reservation/show'
    ;
  end
  def create
    reservation = Reservation.new(reservation_params)
    reservation.user_id = current_user.id
    if reservation.save
      render json: reservation, status: 201, location: [:api, reservation]
    else
      render json: { errors: reservation.errors }, status: 422
    end
  end

  def destroy
    #User.delete(params[:id])
    reservation = Reservation.find(params[:id])
    if reservation.destroy
      render json: reservation, status: 201, location: [:api, reservation]
    else
      render json: { errors: reservation.errors }, status: 422
    end
    #respond_with user, :location => all_users_index_url
  end

  def update
    #User.delete(params[:id])
    reservation = Reservation.find(params[:id])
    reservation.update(reservation_params)
    if reservation.save
      render json: reservation, status: 201, location: [:api, reservation]
    else
      render json: { errors: reservation.errors }, status: 422
    end
  end

  def new
    @reservation = Reservation.new
    @reservation.num = 1
    #respond_to do |format|
      #format.html #{ render :partial => 'new'}
      #format.json {render :json => @user}
    #end
    render :partial => 'api/reservation/new'
  end

  private

  def reservation_params
    params.require(:reservation).permit(:time_from, :time_to, :num, :restaurant_id, :user_id)
  end
end
