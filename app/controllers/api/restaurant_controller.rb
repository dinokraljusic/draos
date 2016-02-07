class Api::RestaurantController < ApplicationController
  respond_to :json, :html

  def show
    respond_with Restaurant.find(params[:id])
  end

  def index
    restaurants = Restaurant.find_by_sql("select r.*, avg(ra.rate) avg from restaurants r left join ratings ra on r.id=ra.restaurant_id group by r.id order by avg desc")
    respond_with restaurants.to_json :methods => :avg
  end

  def create
    restaurant = Restaurant.new(restaurant_params)
=begin
    restaurant.user_id=current_user.id
=end
    if upload
      uploaded_io = params[:restaurant][:menu]
      directory = 'uploads'
      restaurant.menu=File.join(directory, uploaded_io.original_filename)
    end

    if restaurant.save
      respond_to do |format|
        format.html { redirect_to root_url }
        format.json { render json: restaurant, status: 201, location: [:api, restaurant] }
      end
    else
      render json: {errors: restaurant.errors}, status: 422
    end
  end

  def new
    @restaurant = Restaurant.new
    respond_to do |format|
      format.html { render 'restaurant/new' }
      format.json { render :json => @restaurant }
    end
  end

  def destroy
    #User.delete(params[:id])
    restaurant = Restaurant.find(params[:id])
    if restaurant.destroy
      render json: restaurant, status: 201, location: [:api, restaurant]
    else
      render json: {errors: restaurant.errors}, status: 422
    end
    #respond_with user, :location => all_users_index_url
  end

  def update
    #User.delete(params[:id])
    restaurant = Restaurant.find(params[:id])
    restaurant.update(restaurant_params)
    if restaurant.save
      render json: restaurant, status: 201, location: [:api, restaurant]
    else
      render json: {errors: restaurant.errors}, status: 422
    end
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :user_id, :lon, :lat, :description, :tip, :working_hours_from, :working_hours_to)
  end

  def upload
    uploaded_io = params[:restaurant][:menu]
    if uploaded_io
      File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
        file.write(uploaded_io.read)
      end
    end
  end

end
