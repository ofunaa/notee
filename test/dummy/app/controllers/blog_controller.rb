class BlogController < ApplicationController
  def index
    get_all_notees
  end

  def notee_category
    get_notees_by_category_name(parmas[:category_name])
  end

  def notee_id
    get_notee_by_id(params[:id])
  end

  def notee_slug
    get_notee_by_slug(params[:slug])
  end
end
