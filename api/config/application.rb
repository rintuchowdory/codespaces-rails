require_relative "boot"

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "rack/cors"

Bundler.require(*Rails.groups)

module CodespacesRailsApi
  class Application < Rails::Application
    config.load_defaults 8.1

    # API-only mode: no views, cookies, or sessions middleware.
    config.api_only = true

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins [
          ENV.fetch("FRONTEND_ORIGIN", "http://localhost:5173"),
          "https://rintu-chowdory.github.io",
          "https://rintuchowdory.github.io"
        ]
        resource "*",
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end
  end
end
