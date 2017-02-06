require 'rails_helper'

RSpec.describe Notee::RolesController, type: :controller do

  describe 'public' do
    routes { Notee::Engine.routes }

    Notee::User.skip_callback(:create, :before, :create_authority)
    @user = FactoryGirl.create(:user)
    Notee::User.set_callback(:create, :before, :create_authority)

    context 'GET #index' do
      it "render json: {status: success, roles: User.roles}" do
        get :index
        expect(response).to be_success
      end
    end

    context 'GET #show' do
      context ':find_user_by_access_token success' do
        it "render json: { status: 'success', role: user.role }" do
          get :show
          expect(response).to be_success
        end
      end

      context ':find_user_by_access_token failed' do
        it "render json: { status: 'failed' }" do
          get :show
          expect(response).to be_success
        end
      end
    end
  end


  describe 'private' do
    context ':find_user_by_access_token' do
      context 'success' do
        it "render json: { status: 'success', role: user.role }" do
          user = find_user_by_access_token
          expect(user).to be_nil
        end
      end

      context 'failed' do
        it "render json: { status: 'failed' }" do
          user = find_user_by_access_token
          expect(user).to be_nil
        end
      end
    end
  end

end
