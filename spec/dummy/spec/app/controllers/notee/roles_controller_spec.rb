require 'rails_helper'

RSpec.describe Notee::RolesController, type: :controller do
  describe 'GET #index' do
    it "render json: {status: success, roles: User.roles}" do
      get :index
      expect(response).to be_success
    end
  end
end
