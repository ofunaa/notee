require 'redcarpet'

module Notee
  module Helpers
    module ViewHelper
      def notee_content (notee)

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
        @comments = Notee::Comment.where(post_id: id)
        @comment = Notee::Comment.new
        return render :partial => "notee/partials/comment_box.html.erb", :locals => { :post_id => id}
      end
    end
  end
end
