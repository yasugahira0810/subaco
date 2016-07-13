# Prepare

    git clone https://github.com/yasslab/sample_apps.git
    mv sample_apps/4_2_2/ch10 subaco2
    rm -rf sample_apps
    cd subaco2
    git config --global user.name "Yuta Yasugahira"
    git config --global user.email "hourou_freak@yahoo.co.jp"
    git add -A
    git commit -am "initial commit"
    git remote add origin https://github.com/yasugahira0810/subaco2.git
    git push origin master
    gem install bundler
    bundle install
    rake db:migrate

# Access Confirmation

    rails s -b $IP -p $PORT

# Create User

db/seeds.rbをいじる。

	cat db/seeds.rb 
	User.create!(name: "安ヶ平　雄太",
	             email: "hourou_freak@yahoo.co.jp",
	             password:              "password",
	             password_confirmation: "password",
	             admin: true,
	             activated: true,
	             activated_at: Time.zone.now)
	
	99.times do |n|
	  name  = Faker::Name.name
	  email = "example-#{n+1}@railstutorial.org"
	  password = "password"
	  User.create!(name:  name,
	               email: email,
	               password:              password,
	               password_confirmation: password,
	               activated: true,
	               activated_at: Time.zone.now)
	end

migrateする。rails tutorialの9.3.2あたりに書いてある。

	bundle exec rake db:migrate:reset
	bundle exec rake db:seed

# Install fullcalendar-rails

- [fullcalendar-rails](https://github.com/bokmann/fullcalendar-rails)に  記載の手順を実施して、bundle install。
