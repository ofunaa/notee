require 'redcarpet'

module Notee
  module ViewHelper
    def notee_markdown(text)

      unless @markdown
        renderer = Redcarpet::Render::HTML.new(filter_html: true, hard_wrap: true)
        @markdown = Redcarpet::Markdown.new(renderer)
      end

      @markdown.render(text).html_safe
    end

  end
end
