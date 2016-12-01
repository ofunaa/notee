require 'redcarpet'

module Notee
  module Helpers
    module ViewHelper
      def notee_content(notee)

        return if notee.nil?

        unless @markdown
          renderer = Redcarpet::Render::HTML.new(filter_html: true, hard_wrap: true)
          @markdown = Redcarpet::Markdown.new(renderer, :fenced_code_blocks => true, :highlight => true)
        end

        # TODO: secret_mode
        # if notee.status == Notee::STATUS[:secret_published]
        #   return render :partial => "notee/partials/secret_published.html.erb", :locals => { :item => notee, :markdown => @markdown.render(notee.content).html_safe, :display => false }
        # end

        @markdown.render(notee.content).html_safe
      end

      def notee_comment_box(id)
        return render :partial => "notee/partials/comment_box.html.erb", :locals => { :post_id => id, :recaptcha => Notee.recaptcha_key }
      end

      def notee_meta(meta = Notee.blog_meta)
        return render :partial => "notee/partials/meta.html.erb", :locals => { :meta => meta, :ga => Notee.google_analytics }
      end

      def notee_monthly_links
        return render :partial => "notee/partials/monthly_links.html.erb", :locals => { :monthly_totals => notee_archives }
      end

      def notee_category_links
        return render :partial => "notee/partials/category_links.html.erb", :locals => { :category_totals => notee_categories }
      end

      def notee_writer_links
        return render :partial => "notee/partials/writer_links.html.erb", :locals => { :writers => notee_writers }
      end

      def notee_title
        return Notee.blog_meta[:title]
      end

    end
  end
end
