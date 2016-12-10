class Notee::NoteeController < ApplicationController
  layout 'notee_application'

  before_action :set_meta_info, except: [:show]

  # GET "/"
  def index
    @posts = notees
    @notee_title = 'Post Lists'
    render :action => 'posts'
  end

  # GET "/:id_or_slug"
  def show
    redirect_to root_path if params[:id_or_slug].nil?
    @post = notee(params[:id_or_slug])
    @notee_meta = notee_set_meta_by_post(@post)
  end

  # GET "/categories"
  def categories
    @categories = notee_categories
  end

  # GET "/categories/:name_or_slug"
  def category_posts
    @posts = category_notees(params[:name_or_slug])
    @notee_title = 'Category: ' + params[:name_or_slug]
    render :action => 'posts'
  end

  # GET "/archives"
  def archives
    @archives = notee_archives
  end

  # GET "/archives/:year"
  # GET "/archives/:year/:month"
  def archive_posts
    @posts = archive_notees(params[:year], params[:month].present? ? params[:month] : nil)
    @notee_title = 'Archive: ' + params[:year] + (params[:month].present? ? "/" + params[:month].to_s : "")
    render :action => 'posts'
  end

  # GET "/writers"
  def writers
    @writers = notee_writers
  end

  # GET "/writers/:name_or_id"
  def writer_posts
    @posts = writer_notees(params[:name_or_id])
    @notee_title = 'Writer: ' + params[:name_or_id]
    render :action => 'posts'
  end

  # GET "/about"
  def about
  end

  private
  def set_meta_info
    @notee_meta = Notee.blog_meta
  end

end
