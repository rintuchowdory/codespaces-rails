FROM ruby:3.4.11-slim AS base

WORKDIR /app

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      build-essential libpq-dev libyaml-dev pkg-config curl && \
    rm -rf /var/lib/apt/lists/*

COPY Gemfile Gemfile.lock* ./
RUN bundle config set without "development test" && \
    bundle install --jobs 4 --retry 3

COPY . .

ENV RAILS_ENV=production \
    RAILS_LOG_TO_STDOUT=true \
    RAILS_SERVE_STATIC_FILES=true

EXPOSE 3000

CMD ["bash", "-c", "bin/rails db:prepare && bundle exec puma -C config/puma.rb"]
