class NoteeController < ApplicationController

  # GET "/"
  def index
    @posts = notees
  end

  # GET "/:id_or_slug"
  def show
    redirect_to root_path if params[:id_or_slug].nil?
    @post = notee(params[:id_or_slug])
  end

  # GET "/category"
  def categories
  end

  # GET "/category/:name_or_slug"
  def category_posts
    redirect_to root_path if params[:name_or_slug].nil?
    @posts = category_notees(params[:name_or_slug])
  end

  # GET "/archive"
  def archives
  end

  # GET "/archive/:year"
  # GET "/archive/:year/:month"
  def archive_posts
    redirect_to root_path if params[:year].nil?
    @posts = archive_notees(params[:year], params[:month].present? ? params[:month] : nil)
  end

  # GET "/new"
  # GET "/new?page=hoge"
  def new_arrival
    @posts = notees
  end
end
