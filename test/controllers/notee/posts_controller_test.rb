require 'test_helper'

module Notee
  class PostsControllerTest < ActionController::TestCase
    setup do
      @post = notee_posts(:one)
      @routes = Engine.routes
    end

    test "should get index" do
      get :index
      assert_response :success
      assert_not_nil assigns(:posts)
    end

    test "should get new" do
      get :new
      assert_response :success
    end

    test "should create post" do
      assert_difference('Post.count') do
        post :create, post: { category_id: @post.category_id, content: @post.content, published_at: @post.published_at, seo_description: @post.seo_description, seo_keyword: @post.seo_keyword, slug: @post.slug, status: @post.status, thumbnail_id: @post.thumbnail_id, title: @post.title }
      end

      assert_redirected_to post_path(assigns(:post))
    end

    test "should show post" do
      get :show, id: @post
      assert_response :success
    end

    test "should get edit" do
      get :edit, id: @post
      assert_response :success
    end

    test "should update post" do
      patch :update, id: @post, post: { category_id: @post.category_id, content: @post.content, published_at: @post.published_at, seo_description: @post.seo_description, seo_keyword: @post.seo_keyword, slug: @post.slug, status: @post.status, thumbnail_id: @post.thumbnail_id, title: @post.title }
      assert_redirected_to post_path(assigns(:post))
    end

    test "should destroy post" do
      assert_difference('Post.count', -1) do
        delete :destroy, id: @post
      end

      assert_redirected_to posts_path
    end
  end
end
