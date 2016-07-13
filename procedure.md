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

# Install fullcalendar-rails

- [fullcalendar-rails](https://github.com/bokmann/fullcalendar-rails)に  記載の手順を実施して、bundle install。
