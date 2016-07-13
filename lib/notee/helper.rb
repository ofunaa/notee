module Notee
  module Helper
    def get_all_notees
      @notees = Notee::Post.where(status: 1)
    end

    def get_secret_notees
      @notees = Notee::Post.where(status: 2)
    end

    def get_notees_by_category_name(category_name)
      category_id = Notee::Category.find_by(name: category_name)
      @notees = Notee::Post.where(category_id: category_id, status: 1)
    end

    def get_notee_by_id(id)
      @notee = Notee::Post.find_by(id: id, status: 1)
    end

    def get_notee_by_slug(slug)
      @notee = Notee::Post.find_by(slug: slug, status: 1)
    end

  end
end
