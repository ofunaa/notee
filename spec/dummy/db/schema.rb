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

ActiveRecord::Schema.define(version: 20160713102623) do

  create_table "notee_categories", force: :cascade do |t|
    t.string   "name",       default: "category_name", null: false
    t.string   "slug",       default: "2016-19-26-54", null: false
    t.integer  "parent_id"
    t.integer  "status",     default: 0,               null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.index ["slug"], name: "index_notee_categories_on_slug", unique: true
  end

  create_table "notee_images", force: :cascade do |t|
    t.string   "content",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notee_posts", force: :cascade do |t|
    t.string   "title",           default: "no title"
    t.text     "content"
    t.string   "slug",            default: "2016-19-26-54"
    t.integer  "status",          default: 0
    t.integer  "category_id",     default: 0
    t.integer  "thumbnail_id",    default: 0
    t.datetime "published_at",    default: '2016-07-13 10:26:54'
    t.string   "seo_keyword",     default: ""
    t.string   "seo_description", default: ""
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.index ["slug"], name: "index_notee_posts_on_slug", unique: true
  end

  create_table "notee_tokens", force: :cascade do |t|
    t.string   "access_token", null: false
    t.datetime "expires_at",   null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["access_token"], name: "index_notee_tokens_on_access_token", unique: true
  end

end
