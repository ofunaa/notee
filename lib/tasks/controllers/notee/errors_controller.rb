class ErrorsController < ActionController::Base
  layout 'notee_application'

  rescue_from ActiveRecord::RecordNotFound, with: :render_404
  rescue_from ActionController::RoutingError, with: :render_404
  rescue_from StandardError, with: :render_500

  def render_404(exception = nil)
    if exception
      logger.info "Rendering 404 with exception: #{exception.message}"
    end
    render template: "notee/errors/error_404", status: 404
  end

  def render_500(exception = nil)
    if exception
      logger.info "Rendering 500 with exception: #{exception.message}"
    end
    render template: "notee/errors/error_500", status: 500
  end

  def show; raise env["action_dispatch.exception"]; end
end
