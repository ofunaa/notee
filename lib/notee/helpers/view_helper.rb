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

      def notee_meta(meta)
        meta ||= Notee.blog_meta
        return render :partial => "notee/partials/meta.html.erb", :locals => { :meta => meta, :ga => Notee.google_analytics }
      end

      # def notee_monthly_links
      #   return render :partial => "notee/partials/monthly_links.html.erb", :locals => { :monthly_notees =>  }
      # end
			#
      def notee_category_links
        notee_hash = {}
        Notee::Post.select(:category_id).each do |notee|
          if notee_hash.has_key?("#{notee.category.name}")
            notee_hash["#{notee.category.name}"] = notee_hash["#{notee.category.name}"] + 1
          else
            notee_hash.store(notee.category.name,1)
          end
        end

        return render :partial => "notee/partials/category_links.html.erb", :locals => { :category_notees_hash => notee_hash }
      end
    end
  end
end
