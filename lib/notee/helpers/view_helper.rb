require 'redcarpet'

module Notee
  module Helpers
    module ViewHelper
      def notee_content(post)

        return if post.nil?

        unless @markdown
          renderer = Redcarpet::Render::HTML.new(filter_html: true, hard_wrap: true)
          @markdown = Redcarpet::Markdown.new(renderer, :fenced_code_blocks => true, :highlight => true)
        end

        # TODO: secret_mode
        # if notee.status == Notee::STATUS[:secret_published]
        #   return render :partial => "notee/partials/secret_published.html.erb", :locals => { :item => notee, :markdown => @markdown.render(notee.content).html_safe, :display => false }
        # end

        @markdown.render(post.content).html_safe
      end

      def notee_comment_box(post_id)
        return render :partial => "notee/partials/comment_box.html.erb", :locals => { :post_id => post_id, :recaptcha => Notee.recaptcha_key }
      end

      def notee_meta(meta = Notee.blog_meta)
        return render :partial => "notee/partials/meta.html.erb", :locals => { :meta => meta, :ga => Notee.google_analytics }
      end

      def notee_title
        return Notee.blog_meta[:title]
      end

      def notee_description
        return Notee.blog_meta[:description]
      end

    end
  end
end
