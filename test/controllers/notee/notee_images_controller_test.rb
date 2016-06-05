require 'test_helper'

module Notee
  class NoteeImagesControllerTest < ActionController::TestCase
    setup do
      @notee_image = notee_notee_images(:one)
      @routes = Engine.routes
    end

    test "should get index" do
      get :index
      assert_response :success
      assert_not_nil assigns(:notee_images)
    end

    test "should get new" do
      get :new
      assert_response :success
    end

    test "should create notee_image" do
      assert_difference('NoteeImage.count') do
        post :create, notee_image: { content: @notee_image.content }
      end

      assert_redirected_to notee_image_path(assigns(:notee_image))
    end

    test "should show notee_image" do
      get :show, id: @notee_image
      assert_response :success
    end

    test "should get edit" do
      get :edit, id: @notee_image
      assert_response :success
    end

    test "should update notee_image" do
      patch :update, id: @notee_image, notee_image: { content: @notee_image.content }
      assert_redirected_to notee_image_path(assigns(:notee_image))
    end

    test "should destroy notee_image" do
      assert_difference('NoteeImage.count', -1) do
        delete :destroy, id: @notee_image
      end

      assert_redirected_to notee_images_path
    end
  end
end
