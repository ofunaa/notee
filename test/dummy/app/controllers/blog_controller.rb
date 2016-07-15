class BlogController < ApplicationController
  def index
    get_all_notees
  end

  def notee_category
    get_notees_by_category_name(parmas[:category_name])
    render 'index'
  end

  def notee_id
    get_notee_by_id(params[:id])
    render 'show'
  end

  def notee_slug
    get_notee_by_slug(params[:slug])
    render 'show'
  end
end
