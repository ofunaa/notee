require 'test_helper'

module Notee
  class CategoriesControllerTest < ActionController::TestCase
    setup do
      @category = notee_categories(:one)
      @routes = Engine.routes
    end

    test "should get index" do
      get :index
      assert_response :success
      assert_not_nil assigns(:categories)
    end

    test "should get new" do
      get :new
      assert_response :success
    end

    test "should create category" do
      assert_difference('Category.count') do
        post :create, categories: {name: @category.name, parent_id: @category.parent_id, slug: @category.slug, status: @category.status }
      end

      assert_redirected_to category_path(assigns(:categories))
    end

    test "should show category" do
      get :show, id: @category
      assert_response :success
    end

    test "should get edit" do
      get :notee, id: @category
      assert_response :success
    end

    test "should update category" do
      patch :update, id: @category, categories: {name: @category.name, parent_id: @category.parent_id, slug: @category.slug, status: @category.status }
      assert_redirected_to category_path(assigns(:categories))
    end

    test "should destroy category" do
      assert_difference('Category.count', -1) do
        delete :destroy, id: @category
      end

      assert_redirected_to categories_path
    end
  end
end
