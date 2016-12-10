class Notee::ErrorsController < ActionController::Base
  layout 'notee_application'

  rescue_from ActiveRecord::RecordNotFound, with: :resque404
  rescue_from ActionController::RoutingError, with: :resque404
  rescue_from StandardError, with: :resque500

  def resque404(exception = nil)
    if exception
      logger.info "Rendering 404 with exception: #{exception.message}"
    end
    render template: "notee/errors/not_found", status: 404
  end

  def resque500(exception = nil)
    if exception
      logger.info "Rendering 500 with exception: #{exception.message}"
    end
    render template: "notee/errors/internal_server_error", status: 500
  end

  def show; raise env["action_dispatch.exception"]; end
end
