namespace :build do
  desc "build production"
  task :prod do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        with fetch(:yarn_env_variables, {}) do
          execute :yarn, :build
        end
      end
    end
  end
end
