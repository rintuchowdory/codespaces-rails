require "rails_helper"

RSpec.describe "Health API", type: :request do
  describe "GET /api/v1/health" do
    it "returns ok status" do
      get "/api/v1/health"

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body).to include(
        "status" => "ok",
        "environment" => "test"
      )
    end
  end
end
