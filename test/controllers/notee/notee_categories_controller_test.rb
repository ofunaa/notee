require 'test_helper'

module Notee
  class NoteeCategoriesControllerTest < ActionController::TestCase
    setup do
      @notee_category = notee_notee_categories(:one)
      @routes = Engine.routes
    end

    test "should get index" do
      get :index
      assert_response :success
      assert_not_nil assigns(:notee_categories)
    end

    test "should get new" do
      get :new
      assert_response :success
    end

    test "should create notee_category" do
      assert_difference('NoteeCategory.count') do
        post :create, notee_category: { name: @notee_category.name, parent_id: @notee_category.parent_id, slug: @notee_category.slug, status: @notee_category.status }
      end

      assert_redirected_to notee_category_path(assigns(:notee_category))
    end

    test "should show notee_category" do
      get :show, id: @notee_category
      assert_response :success
    end

    test "should get edit" do
      get :edit, id: @notee_category
      assert_response :success
    end

    test "should update notee_category" do
      patch :update, id: @notee_category, notee_category: { name: @notee_category.name, parent_id: @notee_category.parent_id, slug: @notee_category.slug, status: @notee_category.status }
      assert_redirected_to notee_category_path(assigns(:notee_category))
    end

    test "should destroy notee_category" do
      assert_difference('NoteeCategory.count', -1) do
        delete :destroy, id: @notee_category
      end

      assert_redirected_to notee_categories_path
    end
  end
end
