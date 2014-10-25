# Lone Deleuran - Zoneterapi


Copyright 2014 &copy; Lone Deleuran


## Branching

We're using [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/) as the base branching model. All new development should be done in `feature/` branches. Hotfixes should go in `hotfix/` branches. `develop` should represent latest stable development version. `master` should only be used to pull new releases from `develop` and (hopefully not) `hotfix/`. New sub-branches on `feature/`and `hotfix/` should only be lowercase letters and normal dash (i.e. `feature/some-name`). All sub branches should be deleted as they are moved to stable(ish) `develop`. 



## Install

Clone the repo, then install the required node modules using `npm`.

	$ git clone git@bitbucket.org:umwelt/roskilde.git
	$ cd roskilde
	$ npm install

If you don't have _npm_ installed, it's recommended to download it from [the official website](http://nodejs.org/).



## Development server

Run the node server in the root of the project, then run gulp with livereload: 

	$ npm start
	$ gulp

The navigate your browser to [http://localhost:3000](http://localhost:3000) and the solution should be running. To  best mimmick the live environment, you need to map `local.roskilde-festival.dk` or similar to your `localhost` by [editing you hosts file](http://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/), as the FB app is limited to the `roskilde-festival.dk` domain.



## Front-end task management and development

__Gulp__ is used for front-end task management. Run continuous development build by running `gulp`. For running the build step only, use `gulp build`. To mimic production build, run with `--production`. 

We're using __SASS with Bourbon__ to write our CSS, which we write using [Brad Frosts Atomic Design principles adapted by Robin Rendle](http://robinrendle.com/essays/the-other-interface). We write all our [CSS using BEM principles](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).