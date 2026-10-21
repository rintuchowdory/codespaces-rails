# This file is copied to spec/ when you run 'rails generate rspec:install'
require "spec_helper"
ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
# Prevent database truncation if production environment is loaded
abort("The Rails environment is running in production mode!") if Rails.env.production?
require "rspec/rails"

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or fixtures
  config.fixture_paths = [Rails.root.join("spec/fixtures")]
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
