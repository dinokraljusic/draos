Rails.application.routes.draw do

  get 'admin/index'

  get 'password_reset/new'

  post   'pass_reset'   => 'password_reset#create'

  get 'pass_reset_edit'   => 'password_reset#edit'

  patch 'pass_reset_edit'   => 'password_reset#update'

  resources :password_reset,     only: [:new, :create, :edit, :update]

  get 'sessions/new'

  get 'activate_user' => 'sessions#new'

  #get 'api/reservation/show'

  #post   'reservation'   => 'api/reservation#create'

  #get 'reservation'   => 'api/reservation#show'

  #get 'all_users/index'

  get 'static_pages/index'

  get 'static_pages/index'
  root 'static_pages#index'

  #get 'user' => 'api/users#show'


=begin
  namespace :api do
  get 'reservation/show'
  end

  namespace :api do
  get 'reservation/create'
  end
=end

=begin
  namespace :api do
  get 'rating/show'
  end

  namespace :api do
  get 'rating/create'
  end

  namespace :api do
  get 'role/show'
  end

  namespace :api do
  get 'role/create'
  end
=end

  get    'login'   => 'sessions#new'
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'

  get 'reservation' => 'api/reservation#new'
  post 'reservation' => 'api/reservation#create'



 # get 'signup'  =>  'new_api_user_path'


  #get 'restaurant_controller/show'

  #get 'restaurant_controller/create'

  devise_for :users

  namespace :api, defaults: { format: :json } do

    # We are going to list our resources here
   # resources :users, :only => [:show, :create, :destroy, :update]
    resources :users
    resources :restaurant, :only => [:show, :create, :destroy, :update, :index, :new]
    resources :role, :only => [:show, :create, :destroy, :update, :index]
    resources :rating, :only => [:show, :create, :destroy, :update]
    resources :reservation, :only => [:show, :create, :destroy, :update]
  end

  namespace :api, defaults: { format: :json } do
    resources :users do
      resources :rating
    end
  end

  namespace :api, defaults: { format: :json } do
    get 'user_signup_freq'  =>  'users#user_signup_freq'
    get 'restaurant_rate_hist/:restaurant_id'  =>  'rating#rating_history'
  end

 # namespace :api, defaults: { format: :html } do
    get 'signup'  =>  'api/users#new'
    get 'profile' =>  'api/users#edit'
    post 'signup'  =>  'api/users#create'
    get 'profiles' =>  'api/users#index'

    post 'restaurantcreate' => 'api/restaurant#create'
    get 'restaurantcreate' => 'api/restaurant#new'
    get 'create' => 'api/restaurant#new'

    get 'admin' => 'admin#index'

  #end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end


end
