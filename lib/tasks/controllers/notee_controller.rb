class NoteeController < ApplicationController

  before_action :set_meta_info, except: [:show]
  before_action :set_title, only: [:index, :category_posts, :archives_posts, :writer_posts]

  # GET "/"
  def index
    @posts = notees
    render :action => 'posts'
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
    render :action => 'posts'
  end

  # GET "/archive"
  def archives
    @archives = notee_archives
  end

  # GET "/archive/:year"
  # GET "/archive/:year/:month"
  def archives_posts
    redirect_to root_path if params[:year].nil?
    @posts = archive_notees(params[:year], params[:month].present? ? params[:month] : nil)
    render :action => 'posts'
  end

  # GET "/writer"
  def writers
    @writers = notee_writers
  end

  # GET "/writer/:name_or_id"
  def writer_posts
    redirect_to root_path if params[:name_or_id].nil?
    @posts = writer_notees(params[:name_or_id])
    render :action => 'posts'
  end

  private
  def set_meta_info
    @notee_meta = Notee.blog_meta
  end

  def set_title
    case request.fullpath
      when notee_public_index_path
        return @notee_title = 'Notee Index'
      when notee_public_category_posts_path
        return @notee_title = 'Category: ' + params[:name_or_slug]
      when notee_public_archive_posts_path
        return @notee_title = 'Archive: ' + params[:year] + params[:month].present? ? "/" + params[:month].to_s : ""
      when notee_public_writer_posts_path
        return @notee_title = 'Writer: ' + params[:name_or_id]
    end
    return @notee_title = 'Notee'
  end

end
