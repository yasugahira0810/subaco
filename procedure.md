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

# Sign Up

- サインアップすると以下のメッセージが出る。


    Account not activated. Check your email for the activation link.

- DBのアクティベーション状態を書き換える。


    sqlite3 db/development.sqlite3
    SQLite version 3.8.2 2013-12-06 14:53:30
    Enter ".help" for instructions
    Enter SQL statements terminated with a ";"
    sqlite> .tables
    schema_migrations  users            
    sqlite> .headers ON
    sqlite> .mode line
                   id = 1
                 name = 安ヶ平雄太
                email = hourou_freak@yahoo.co.jp
           created_at = 2016-07-13 12:26:55.306672
           updated_at = 2016-07-13 12:26:55.306672
      password_digest = $2a$10$vVI4/YAGWXGyaVPhjG6J.OaWssBGpmRMQZInEBjlvmETCRZhS6dli
      remember_digest = 
                admin = f
    activation_digest = $2a$10$Hsv7QeW8U22zZoCLBFCUferdqi9M1hOkL7ToFJGFirign28t.640q
            activated = f
         activated_at = 
         reset_digest = 
        reset_sent_at = 
    sqlite> UPDATE users SET activated = 't' WHERE id = 1;                                                   
    sqlite> SELECT * from users;
                   id = 1
                 name = 安ヶ平雄太
                email = hourou_freak@yahoo.co.jp
           created_at = 2016-07-13 12:26:55.306672
           updated_at = 2016-07-13 12:26:55.306672
      password_digest = $2a$10$vVI4/YAGWXGyaVPhjG6J.OaWssBGpmRMQZInEBjlvmETCRZhS6dli
      remember_digest = 
                admin = f
    activation_digest = $2a$10$Hsv7QeW8U22zZoCLBFCUferdqi9M1hOkL7ToFJGFirign28t.640q
            activated = t
         activated_at = 
         reset_digest = 
        reset_sent_at = 
    sqlite> 

# Install fullcalendar-rails

- [fullcalendar-rails](https://github.com/bokmann/fullcalendar-rails)に  記載の手順を実施して、bundle install。
