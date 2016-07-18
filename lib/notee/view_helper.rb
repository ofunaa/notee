require 'redcarpet'

module Notee
  module ViewHelper
    def notee_content(text)

      unless @markdown
        renderer = Redcarpet::Render::HTML.new(filter_html: true, hard_wrap: true)
        @markdown = Redcarpet::Markdown.new(renderer, :fenced_code_blocks => true, :highlight => true)
      end

      @markdown.render(text).html_safe
    end

  end
end
