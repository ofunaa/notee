module Notee
  module Helper
    def notees(search_txt)
      if search_txt.nil?
        # all_notees
        @notees = Notee::Post.where(status: Notee::STATUS[:published]).order(published_at: :desc)
      else
        # search_by_category_slug
        category_id = Notee::Category.find_by(slug: search_txt)
        category_id = Notee::Category.find_by(name: search_txt) unless category_id
        return false unless category_id

        @notees = Notee::Post.where(category_id: category_id, status: Notee::STATUS[:published]).order(published_at: :desc)
      end

      @notees

    end

    def secret_notees
      @notees = Notee::Post.where(status: Notee::STATUS[:secret_published]).order(published_at: :desc)
    end


    def notee(search_txt)
      return false unless search_txt
      @notee = Notee::Post.find_by(id: search_txt, status: Notee::STATUS[:published])
      @notee = Notee::Post.find_by(slug: search_txt, status: Notee::STATUS[:published]) unless @notee

      @notee
    end
  end
end
