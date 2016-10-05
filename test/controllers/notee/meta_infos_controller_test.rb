require 'test_helper'

module Notee
  class MetaInfosControllerTest < ActionDispatch::IntegrationTest
    include Engine.routes.url_helpers

    setup do
      @meta_info = notee_meta_infos(:one)
    end

    test "should get index" do
      get meta_infos_url
      assert_response :success
    end

    test "should get new" do
      get new_meta_info_url
      assert_response :success
    end

    test "should create meta_info" do
      assert_difference('MetaInfo.count') do
        post meta_infos_url, params: { meta_info: {  } }
      end

      assert_redirected_to meta_info_url(MetaInfo.last)
    end

    test "should show meta_info" do
      get meta_info_url(@meta_info)
      assert_response :success
    end

    test "should get edit" do
      get edit_meta_info_url(@meta_info)
      assert_response :success
    end

    test "should update meta_info" do
      patch meta_info_url(@meta_info), params: { meta_info: {  } }
      assert_redirected_to meta_info_url(@meta_info)
    end

    test "should destroy meta_info" do
      assert_difference('MetaInfo.count', -1) do
        delete meta_info_url(@meta_info)
      end

      assert_redirected_to meta_infos_url
    end
  end
end
