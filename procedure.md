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

# Display Calendar

app/assets/javascripts/calendar.jsを作成する。  
あとはカレンダーを入れたいHTMLに、以下のコードを加えれば、それでカレンダーが表示される。

	<div id="calendar"></div>

static_pageの一つとして表示されるように実装した。  
すると、ＵＲＬ直アクセスだとアクセスできるが、ヘッダ経由だとカレンダーが表示されない事象が発生。  
ググったところ、ターボリンクが悪さしているらしい。
Gemfileにgem 'jquery-turbolinks'追加して、bundle update。bundle installの方がよかったかもだけど。  
あとはapp/assets/javascripts/application.jsとapp/assets/javascripts/application.jsに追記。  
そしたら表示された。

# Create Event Controller

                rails g controller Events new create
                rails g model Event title:string start:datetime end:datetime allDay:boolean user_name:string
                rake db:migrate

これだと以下のエラーが出る。

                NoMethodError in EventsController#new
                undefined method `events_path' for #<#<Class:0x00000004129c48>:0x00000004123118> Did you mean? events_new_path

一回scaffoldでうまくいくか確認してみる。

************ 追記はじめ **************

rails guideみたけど結局原因が理解できない。。。  
[このあたり](http://railsguides.jp/routing.html)、エラーメッセージ理解するのには役立ちそうだけど。  

2.3 パスとURL用ヘルパー
リソースフルなルーティングを作成すると、アプリケーションのコントローラで多くのヘルパーが利用できるようになります。resources :photosというルーティングを例に取ってみましょう。

photos_pathは/photosを返します
new_photo_pathは/photos/newを返します
edit_photo_path(:id)は/photos/:id/editを返します (edit_photo_path(10)であれば/photos/10/editが返されます)
photo_path(:id)は/photos/:idを返します。 (photo_path(10)であれば/photos/10が返されます)
これらの_pathヘルパーには、それぞれに対応する_urlヘルパー (photos_urlなど) があります。_urlヘルパーは、_pathの前に現在のホスト名、ポート番号、パスのプレフィックスが追加されている点が異なります。

************ 追記終わり **************

# calendar.html.erbの追加

git resetとかしているうちに、calendarページに行くと「Template is missing」になってしまうようになった。  
calendar.html.erbを追加。

# Create Event Controllerで出たエラーの回避

scaffoldの前にsubaco側で設定変えて、同じようなエラーでないか確認した。  
結果、どうも原因はrouting周りらしい。
「get 'events/new'」を「resources: events」にしたらこのエラーはでなくなった。  
もちろん根本解決したわけではないので、routing周り勉強する。  
で、別のエラーが出るようになった。どうも変数がちゃんと渡せていない。  
これはDBの中にユーザが作成できていないのが悪かった。  
rake db:seedでユーザ作ったらちゃんと動いた。

		yasugahira0810:~/workspace/subaco2 (create_event_controller) $ rails console
		Loading development environment (Rails 4.2.2)
		[1] pry(main)> User.count
		   (0.3ms)  SELECT COUNT(*) FROM "users"
		=> 0
		[2] pry(main)> 
		[3] pry(main)> Event.count
		   (0.2ms)  SELECT COUNT(*) FROM "events"
		=> 0
		[4] pry(main)> 
		[4] pry(main)> quit
		yasugahira0810:~/workspace/subaco2 (create_event_controller) $ rake db:seed
		yasugahira0810:~/workspace/subaco2 (create_event_controller) $ rails console
		Loading development environment (Rails 4.2.2)
		[1] pry(main)> User.count
		   (0.3ms)  SELECT COUNT(*) FROM "users"
		=> 100
		[2] pry(main)> User.first
		  User Load (0.3ms)  SELECT  "users".* FROM "users"  ORDER BY "users"."id" ASC LIMIT 1
		=> #<User:0x000000066fbc00
		 id: 1,
		 name: "安ヶ平　雄太",
		 email: "hourou_freak@yahoo.co.jp",
		 created_at: Wed, 03 Aug 2016 03:02:01 UTC +00:00,
		 updated_at: Wed, 03 Aug 2016 03:02:01 UTC +00:00,
		 password_digest: "$2a$10$A3kpkTDBiU/3hL7EEYPU.OiWcrB6eiHYelNm401k2RthOKZ66Q74C",
		 remember_digest: nil,
		 admin: true,
		 activation_digest: "$2a$10$1pw7o8kCf1FY62eIy5nXPuzSmRiEakHhewsbE/8uNy1MxdVgVpbPi",
		 activated: true,
		 activated_at: Wed, 03 Aug 2016 03:02:01 UTC +00:00,
		 reset_digest: nil,
		 reset_sent_at: nil>
		[3] pry(main)> quit

# [バグ]イベントの開始時刻、終了時刻が取得できていない

これはsubacoで解決済みの問題だった。calendar.jsまるっとコピッた。  
subacoで詰まったところはそこにコメントとして書いてあるからいいか。。。

# [バグ]登録済みのイベントがカレンダーに表示されない。

コンソールログを見ると、event/indexがないから処理できないという500番のエラーがでていた。  
subacoをリロードしてもこのエラーは出ていなかった。  
ここで初めて、カレンダーにイベントが表示されているのは、カレンダーがevent/indexを読み込んで  
くれているからなのだとわかった。  
index.html.erbを追加してもダメだったが、index.json.jbuilderを追加したら通った。
