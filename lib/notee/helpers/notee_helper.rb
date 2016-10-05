module Notee
  module Helpers
    module NoteeHelper

      def notee(search_txt)
        return false unless search_txt
        @notee = Notee::Post.find_by(id: search_txt)
        @notee = Notee::Post.find_by(slug: search_txt) unless @notee

        return if @notee.status == Notee::STATUS[:draft] ||
                  @notee.status == Notee::STATUS[:deleted] ||
                  @notee.status == Notee::STATUS[:privated]
        @notee
      end

      def notees(search_txt = 'all')
        @notees = []

        if search_txt == 'all'
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

      def notee_categories(sort = nil)
        @notee_categories = Notee::Category.all.order(created_at: :desc)

        case sort
          when 'alphabetal'
            @notee_categories = @notee_categories.sort
          when 'size'
            @notee_categories = @notee_categories.sort_by {|category| category.name.size }
        end

        @notee_categories
      end

      def notee_archives(year, month)
        start_date = Date.new(year, month, 1)
        end_date = Date.new(year, month, -1)
        @notee_archives = Notee::Post.where(status: Notee::STATUS[:published], :published_at => start_date...end_date)

        @notee_archives
      end

      def notee_archives_menu(type = nil)
        case type
          when 'year'
            return Notee::Post.where(status: Notee::STATUS[:published]).group('year(published_at)').count
          when 'month'
            return Notee::Post.where(status: Notee::STATUS[:published]).group('year(published_at)').group('month(published_at)').count
          else
            return Notee::Post.where(status: Notee::STATUS[:published]).group('year(published_at)').group('month(published_at)').count
        end
      end

      def notee_comments(id)
        return if id.nil?
        @notee_comments = Notee::Post.where(post_id: id)
        @notee_comments
      end

      def notee_set_meta_by_post(post)
        return {
            title: post.title,
            keyword: post.seo_keyword,
            description: post.seo_description,
            og_image: request.base_url + "/notee/" + post.thumbnail.content
        }
      end
    end
  end
end
