set :output, 'log/crontab.log'
set :environment, :production

every 1.day, at: '4:30 am' do
	runner 'Notee::TrashesController.cleanup'
end

