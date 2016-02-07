# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160110183755) do

  create_table "ratings", force: :cascade do |t|
    t.integer  "user_id",       limit: 4
    t.integer  "restaurant_id", limit: 4
    t.integer  "rate",          limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "ratings", ["restaurant_id"], name: "fk_rails_d1b37b4fd3", using: :btree
  add_index "ratings", ["user_id"], name: "fk_rails_a7dfeb9f5f", using: :btree

  create_table "reservations", force: :cascade do |t|
    t.datetime "time_from"
    t.datetime "time_to"
    t.integer  "num",           limit: 4
    t.integer  "user_id",       limit: 4
    t.integer  "restaurant_id", limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "reservations", ["restaurant_id"], name: "fk_rails_0d6bc84231", using: :btree
  add_index "reservations", ["user_id"], name: "fk_rails_48a92fce51", using: :btree

  create_table "restaurants", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.string   "address",         limit: 255
    t.string   "menu",            limit: 255
    t.float    "lon",             limit: 24
    t.float    "lat",             limit: 24
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "user_id",         limit: 4
    t.string   "description",     limit: 255
    t.string   "link",            limit: 255
    t.time     "work_hours_from"
    t.time     "work_hours_to"
    t.string   "tip",             limit: 255
  end

  add_index "restaurants", ["user_id"], name: "fk_rails_aef57e41ec", using: :btree

  create_table "roles", force: :cascade do |t|
    t.string "name", limit: 255
  end

  add_index "roles", ["name"], name: "index_roles_on_name", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name",                   limit: 255
    t.string   "lastname",               limit: 255
    t.string   "username",               limit: 255
    t.integer  "role_id",                limit: 4,   default: 3
    t.boolean  "active",                 limit: 1
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["role_id"], name: "fk_rails_642f17018b", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  add_foreign_key "ratings", "restaurants"
  add_foreign_key "ratings", "users"
  add_foreign_key "reservations", "restaurants"
  add_foreign_key "reservations", "users"
  add_foreign_key "restaurants", "users"
  add_foreign_key "users", "roles"
end
