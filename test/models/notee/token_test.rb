require 'test_helper'

module Notee
  class TokenTest < ActiveSupport::TestCase
    setup do
      @token = Notee::Token.new
    end

    test 'generate_access_token' do
      assert_not_nil @token.access_token
    end

  end
end
