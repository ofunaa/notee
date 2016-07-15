module Notee
  module Helper
    def get_all_notees
      @notees = Notee::Post.where(status: 1)
    end

    def get_secret_notees
      @notees = Notee::Post.where(status: 2)
    end

    def get_notees_by_category_slug(category_slug)

      return false unless category_slug
      category_id = Notee::Category.find_by(name: category_slug)
      return false unless category_id

      @notees = Notee::Post.where(category_id: category_id, status: 1)
    end

    def get_notee_by_id(id)
      return false unless id
      @notee = Notee::Post.find_by(id: id, status: 1)
    end

    def get_notee_by_slug(slug)
      return false unless slug
      @notee = Notee::Post.find_by(slug: slug, status: 1)
    end

  end
end
