# fixthephilippines.org

**Objectives**
* Create a system to help citizens identify, raise and fix issues in their society and the government.
* Isiwalat ang mga tiwaling opisyales ng pamahalaan at mga salot sa ating Lipunan.
* What needs to change is not only the government and officials but the people as well.

**Sections**
* Issues & Events (Latest / Trending, Top Issues / Anomalies)
* People (Politicians, Celebrities, Religious Leaders, and other key people)
* Groups (Government Agencies, NGOs/Non-Profit, Religions, News & TV, Businesses)
* Projects
* Actions (Good actions, Destructive actions/attitudes of the Filipinos, Good attitudes from other countries)
* Vote Wisely (top candidates -- the good and the bad)

**Features**
* Easily see major projects and issues in the country (government and private)
* See project budget, officials, contract and timeline, progress/completion status with photo/video/testimonies from laypeople.
* Let people easily upload their observations about projects, anomalous acts, etc and easily voice out their concerns, frustrations, unfair treatments, inefficiencies of the government
* Let people give suggestions for improvements and let people vote for the best solution (like uservoice.com)
* Prevent people from forgetting past issues and prevent government officials to sway their focus.
* Highlight top reasons and raise awareness why the Philippines is not progressing and still miserable
* Report unreported or unimplemented laws
* Show government officials in all branches of government, their profiles, achievements, projects, budget, assets, lifestyle
* Show government budget and expenditures, from national, provincial/city, district and local.
* Connect to petition site.
* For top issues, the site will generate open letter containing the top complaints and suggested solutions and will be sent to the government official, CC president.
* A social page to connect the issues with the people and the official social accounts of the government and news agencies. It highlights the top complaints of the people and solutions.
* Check a politician profile, their morale principle, history of accomplishments and anomalies so people won't forget especially during election.
* Provide means for government officials to connect with people, discuss the issues and justify their actions.
* Let people vote on an issue: “Me too”, “Fix this”
* A timeline view for People, Project, Group, Event, etc
* Issue > People involved (linked)


## Requirements

You need [Node.js](http://nodejs.org/download/) and
[MongoDB](http://www.mongodb.org/downloads) installed and running.

We use [`bcrypt`](https://github.com/ncb000gt/node.bcrypt.js) for hashing
secrets. If you have issues during installation related to `bcrypt` then [refer
to this wiki
page](https://github.com/jedireza/drywall/wiki/bcrypt-Installation-Trouble).

We use [`emailjs`](https://github.com/eleith/emailjs) for email transport. If
you have issues sending email [refer to this wiki
page](https://github.com/jedireza/drywall/wiki/Trouble-sending-email).


## Installation

Install nodejs

```bash
$ git clone git@github.com:wikitruth/fixmycountry.git && cd ./fixmycountry
$ npm install -g yo generator-kraken bower grunt-cli
$ npm install
```


## Running the app

```bash
$ npm start

# > fixmycountry@0.0.0 start .../fixmycountry
# > grunt
# Running "copy:vendor" (copy) task
# ...
# Running "concurrent:dev" (concurrent) task
# Running "watch" task
# Running "nodemon:dev" (nodemon) task
# Waiting...
# [nodemon] v1.3.7
# [nodemon] to restart at any time, enter `rs`
# [nodemon] watching: *.*
# [nodemon] starting `node app.js`
# Server is running on port 8000
```

Now just use the reset password feature to set a password.

 - Go to `http://localhost:8000/login/forgot/`
 - Submit your email address and wait a second.
 - Go check your email and get the reset link.
 - `http://localhost:8000/login/reset/:email/:token/`
 - Set a new password.

Login. Customize. Enjoy.

## Connect and discuss

Feel free to send feedback to fixthephilippines@gmail.com or join the discussion on [Facebook](https://www.facebook.com/fixtheph/).