module Notee
  module Helper

    def notee(search_txt)
      return false unless search_txt
      @notee = Notee::Post.find_by(id: search_txt)
      @notee = Notee::Post.find_by(slug: search_txt) unless @notee

      return if @notee.status == Notee::STATUS[:draft] ||
                @notee.status == Notee::STATUS[:deleted] ||
                @notee.status == Notee::STATUS[:privated]

      @notee
    end

    def notees(search_txt)
      @notees = []

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

    # TODO: secret_mode
    # def secret_notees
    #   @notees = Notee::Post.where(status: Notee::STATUS[:secret_published]).order(published_at: :desc)
    # end

  end
end
