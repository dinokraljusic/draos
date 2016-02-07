class Api::RatingController < ApplicationController
  respond_to :json
  def show
    respond_with Rating.find(params[:id])
  end

  def index
    user = User.find(params[:user_id])
    respond_with user.rating
  end

  def rating_history
    #ratings = Rating.find_by_sql("SELECT (SELECT avg(rate) FROM ratings WHERE restaurant_id=" + params[:restaurant_id] + " AND updated_at <= ra.updated_at) rate, date(ra.updated_at) updated_at, ra.id, ra.restaurant_id, ra.created_at FROM restaurants rest join ratings ra on ra.restaurant_id=rest.id WHERE restaurant_id=" + params[:restaurant_id] +  " GROUP BY date(ra.updated_at)")
    #respond_with ratings.select { |rating| rating.restaurant_id == params[:restaurant_id]}
    ratings = Rating.find_by_sql('SELECT (SELECT avg(rate) FROM ratings WHERE restaurant_id=' + params[:restaurant_id] + ' AND updated_at <= ra.updated_at) rate_a, date(ra.updated_at) updated_at FROM restaurants rest JOIN ratings ra ON ra.restaurant_id=rest.id WHERE restaurant_id=' + params[:restaurant_id] + ' GROUP BY date(ra.updated_at)')
    respond_with ratings
  end

  def create
    rating = Rating.new(rating_params)
    if rating.save
      render json: rating, status: 201, location: [:api, rating]
    else
      render json: { errors: rating.errors }, status: 422
    end
  end

  def destroy
    #User.delete(params[:id])
    rating = Rating.find(params[:id])
    if rating.destroy
      render json: rating, status: 201, location: [:api, rating]
    else
      render json: { errors: rating.errors }, status: 422
    end
    #respond_with user, :location => all_users_index_url
  end

  def update
    #User.delete(params[:id])
    rating = Rating.find(params[:id])
    rating.update(rating_params)
    if rating.save
      render json: rating, status: 201, location: [:api, rating]
    else
      render json: { errors: rating.errors }, status: 422
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:rate, :restaurant_id, :user_id)
  end
end
