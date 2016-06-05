require 'test_helper'

module Notee
  class NoteePostsControllerTest < ActionController::TestCase
    setup do
      @notee_post = notee_notee_posts(:one)
      @routes = Engine.routes
    end

    test "should get index" do
      get :index
      assert_response :success
      assert_not_nil assigns(:notee_posts)
    end

    test "should get new" do
      get :new
      assert_response :success
    end

    test "should create notee_post" do
      assert_difference('NoteePost.count') do
        post :create, notee_post: { category_id: @notee_post.category_id, content: @notee_post.content, published_at: @notee_post.published_at, seo_description: @notee_post.seo_description, seo_keyword: @notee_post.seo_keyword, slug: @notee_post.slug, status: @notee_post.status, thumbnail_id: @notee_post.thumbnail_id, title: @notee_post.title }
      end

      assert_redirected_to notee_post_path(assigns(:notee_post))
    end

    test "should show notee_post" do
      get :show, id: @notee_post
      assert_response :success
    end

    test "should get edit" do
      get :edit, id: @notee_post
      assert_response :success
    end

    test "should update notee_post" do
      patch :update, id: @notee_post, notee_post: { category_id: @notee_post.category_id, content: @notee_post.content, published_at: @notee_post.published_at, seo_description: @notee_post.seo_description, seo_keyword: @notee_post.seo_keyword, slug: @notee_post.slug, status: @notee_post.status, thumbnail_id: @notee_post.thumbnail_id, title: @notee_post.title }
      assert_redirected_to notee_post_path(assigns(:notee_post))
    end

    test "should destroy notee_post" do
      assert_difference('NoteePost.count', -1) do
        delete :destroy, id: @notee_post
      end

      assert_redirected_to notee_posts_path
    end
  end
end
