require 'test_helper'

module Notee
  class ImagesControllerTest < ActionController::TestCase
    setup do
      @image = notee_images(:one)
      @routes = Engine.routes
    end

    test "should get index" do
      get :index
      assert_response :success
      assert_not_nil assigns(:images)
    end

    test "should get new" do
      get :new
      assert_response :success
    end

    test "should create image" do
      assert_difference('Image.count') do
        post :create, image: {content: @image.content }
      end

      assert_redirected_to image_path(assigns(:image))
    end

    test "should show image" do
      get :show, id: @image
      assert_response :success
    end

    test "should get edit" do
      get :notee, id: @image
      assert_response :success
    end

    test "should update image" do
      patch :update, id: @image, image: {content: @image.content }
      assert_redirected_to image_path(assigns(:image))
    end

    test "should destroy image" do
      assert_difference('Image.count', -1) do
        delete :destroy, id: @image
      end

      assert_redirected_to images_path
    end
  end
end
