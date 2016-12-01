module Notee
  module Helpers
    module NoteeHelper

      def notee(search_txt)
        return false unless search_txt
        post = Notee::Post.find_by(id: search_txt)
        post = Notee::Post.find_by(slug: search_txt) unless post

        return if post.status == Notee::STATUS[:draft] ||
                  post.status == Notee::STATUS[:deleted] ||
                  post.status == Notee::STATUS[:privated] ||
                  post.is_deleted == true
        post
      end


      def notees
        @posts = Notee::Post.where(status: Notee::STATUS[:published], is_deleted: false).order(published_at: :desc)
        @posts
      end


      def category_notees(search_txt)
        # search_by_category_slug
        category = Notee::Category.find_by(slug: search_txt)
        category = Notee::Category.find_by(name: search_txt) unless category
        return false unless category
        return false if category.is_deleted

        @posts = Notee::Post.where(category_id: category.id, status: Notee::STATUS[:published], is_deleted: false).order(published_at: :desc)
        @posts
      end


      def archive_notees(year, month)
        if month
          tmp_month = (month.to_s.size != 2 ? "0" : "") + month.to_s
          tmp_date = year.to_s + tmp_month + "01"
          begin_time = tmp_date.beginning_of_month
          end_time = tmp_date.end_of_month
        else
          tmp_date = year.to_s + "0101"
          begin_time = tmp_date.beginning_of_year
          end_time = tmp_date.end_of_year
        end

        @posts = Notee::Post.where(published_at: begin_time..end_time).order(published_at: :desc)
        @posts
      end


      def notee_categories
        # DATA: {notee.category.name, notee.count}
        Notee::Post.find_by_sql("SELECT category_id as category_id, count(*) as count FROM notee_posts WHERE status=1 and is_deleted=false GROUP BY category_id;")
      end


      def notee_archives
        # DATA: {notee.time, notee.count}
        Notee::Post.find_by_sql("SELECT DATE_FORMAT(published_at, '%Y-%m') as time, count(*) as count FROM notee_posts WHERE status=1 and is_deleted=false GROUP BY DATE_FORMAT(published_at, '%Y-%m') ORDER BY time DESC;")
      end


      def notee_comments(id)
        return if id.nil?
        @notee_comments = Notee::Comment.where(post_id: id, is_hidden: false, is_deleted: false)
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


      # TODO: secret_mode
      # def secret_notees
      #   @notees = Notee::Post.where(status: Notee::STATUS[:secret_published]).order(published_at: :desc)
      # end
    end
  end
end
