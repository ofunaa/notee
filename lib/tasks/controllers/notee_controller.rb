class NoteeController < ApplicationController

  before_action :set_meta_info, except: [:show]

  # GET "/"
  def index
    @posts = notees
  end

  # GET "/:id_or_slug"
  def show
    redirect_to root_path if params[:id_or_slug].nil?
    @post = notee(params[:id_or_slug])
    @notee_meta = notee_set_meta_by_post(@post)
  end

  # GET "/category"
  def categories
    @categories = notee_categories
  end

  # GET "/category/:name_or_slug"
  def category_posts
    redirect_to root_path if params[:name_or_slug].nil?
    @posts = category_notees(params[:name_or_slug])
  end

  # GET "/archive"
  def archives
    @archives = notee_archives
  end

  # GET "/archive/:year"
  # GET "/archive/:year/:month"
  def archive_posts
    redirect_to root_path if params[:year].nil?
    @posts = archive_notees(params[:year], params[:month].present? ? params[:month] : nil)
  end

  # GET "/writer"
  def writers
    @writers = notee_writers
  end

  # GET "/writer/:name_or_id"
  def writer_posts
    redirect_to root_path if params[:name_or_id].nil?
    @posts = writer_notees(params[:name_or_id])
  end

  private
  def set_meta_info
    @notee_meta = Notee.blog_meta
  end

end
