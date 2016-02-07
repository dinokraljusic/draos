class AllUsersController < ApplicationController
  def index
    @users = User.all
  end
end
