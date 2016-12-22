module Notee
  module Helpers
    module NoteeHelper

      def notee(search_txt)
        return false unless search_txt
        post = Notee::Post.find_by(id: search_txt)
        post = Notee::Post.find_by(slug: search_txt) unless post

        raise ActiveRecord::RecordNotFound unless post

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

        raise ActiveRecord::RecordNotFound unless category
        raise ActiveRecord::RecordNotFound if category.is_deleted

        @posts = Notee::Post.where(category_id: category.id, status: Notee::STATUS[:published], is_deleted: false).order(published_at: :desc)
        @posts
      end


      def archive_notees(year, month)
        if month
          tmp_month = (month.to_s.size != 2 ? "0" : "") + month.to_s
          tmp_date = year.to_s + tmp_month + "01"
          begin_time = Date.parse(tmp_date).beginning_of_month
          end_time = Date.parse(tmp_date).end_of_month
        else
          tmp_date = year.to_s + "0101"
          begin_time = Date.parse(tmp_date).beginning_of_year
          end_time = Date.parse(tmp_date).end_of_year
        end

        @posts = Notee::Post.where(published_at: begin_time..end_time, status: Notee::STATUS[:published], is_deleted: false).order(published_at: :desc)
        @posts
      end


      def writer_notees(name_or_id)
        writer = Notee::User.find_by(name: name_or_id)
        writer = Notee::User.find_by(name: name_or_id) unless writer

        raise ActiveRecord::RecordNotFound unless writer
        raise ActiveRecord::RecordNotFound if writer.is_deleted

        @posts = Notee::Post.where(user_id: writer.id, status: Notee::STATUS[:published], is_deleted: false).order(published_at: :desc)
      end


      def notee_archives
        posts = Notee::Post.select(:published_at).where(status: 1, is_deleted: false).order(created_at: :desc)

        notee_archives = {}
        posts.each do |post|
          month_str = post.published_at.strftime("%Y/%m")
          if notee_archives.has_key?(month_str)
            notee_archives[month_str] = notee_archives[month_str] + 1
          else
            notee_archives.store(month_str, 1)
          end
        end

        notee_archives
        # Notee::Post.find_by_sql("SELECT DATE_FORMAT(published_at, '%Y-%m') as time, count(*) as count FROM notee_posts WHERE status=1 and is_deleted=false GROUP BY DATE_FORMAT(published_at, '%Y-%m') ORDER BY time DESC;")
      end


      def notee_writers
        posts = Notee::Post.select(:user_id).where(status: 1, is_deleted: false).order(created_at: :desc)

        notee_writers = []
        posts.each do |post|
          notee_writers.push(post.user) unless notee_writers.include?(post.user)
        end

        notee_writers
      end


      def notee_comments(post_id)
        return if post_id.nil?
        @notee_comments = Notee::Comment.where(post_id: post_id, is_hidden: false, is_deleted: false)
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


      def get_parent_categories_arr
        categories = Notee::Category.where(is_private: false, is_deleted: false)
        parent_categories = categories.map do |cate|
          cate unless cate.parent_id.present?
        end
        parent_categories.compact!
      end

      def get_category_posts_count(category)
        count = 0
        count = recursive_category_family_loop(category, count)
        count
      end

      private

      def recursive_category_family_loop(category, count)
        if category.children.present?
          category.children.each do |child_cate|
            count = recursive_category_family_loop(child_cate, count)
          end
        end

        count = count + get_posts_count(category.posts)
        count
      end

      def get_posts_count(posts)
        count = 0
        posts.each do |post|
          count = count + 1 if post.is_deleted == false && post.status == 1
        end

        count
      end
    end
  end
end
