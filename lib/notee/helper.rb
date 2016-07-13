module Notee
  module Helper
    def notee_all
      @notees = Notee::Post.find_by(status: 1)
    end
  end
end
