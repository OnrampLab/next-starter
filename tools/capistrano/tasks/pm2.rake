namespace :pm2 do
  task :reset do
    on roles(:app) do
      within current_path do
        execute :pm2, "reset #{fetch(:application)}"
      end
    end
  end
end
