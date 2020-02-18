# config valid only for current version of Capistrano
set :application, ENV['APPLICATION']
set :repo_url, ENV['REPO']
set :deploy_to, ENV['DEPLOY_TO']
# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# config/deploy.rb

lock '3.10.1'

# application settings
set :scm, :git

# others settings
set :format, :pretty
set :log_level, :debug
set :pty, true
set :keep_releases, 5
set :linked_dirs, %w{node_modules}
set :linked_files, %w(.env)

# nvm settings
set :nvm_type, :user # or :system, depends on your nvm setup
set :nvm_node, 'v12.15.0'
set :nvm_map_bins, %w{node yarn pm2}
set :nvm_node_path, -> {
  if fetch(:nvm_type, :user) == :system
    '/usr/local/nvm/'
  else
    "$HOME/.nvm/"
  end
}

# yarn setting
set :yarn_flags, '' # default
set :yarn_roles, :all                                      # default
set :yarn_env_variables, {}                                # default

# pm2 settings
set :pm2_config, 'tools/pm2/pm2.config.js --update-env' # PM2 config path by default

# hooks
namespace :deploy do
  after :updated, 'build:prod'
  after :published, 'pm2:reload'
  after :published, 'pm2:dump'
  after :finishing, 'pm2:reset'
end
