# Allwin Git workshop

## Intro

This project meant to be a tutorial for getting basic/advanced knowledge in using git commands. It also covers how to introduce conventional commits and generate changelog.

Git is a versioning tool, so it is not only contain the latest version of the software, but every version over the time. It stores the changes in commits, which can be stored on multiple branches.

Git uses local-remote repository strategy to add the ability for the developers to write their code in a collaborative way.
Git provides tools to create or manipulate changes and how to put the changes of different developers together.

In this workshop, we are going to learn some commands which might be useful during operating with git.

Let's _git_ some knowledge! 🧐

## How to use this repository

To start practicing, it is useful to clone this repository and read the README file. If you want to get hands-on experience you can checkout some of the branches and try the commands.

## Table of contents

- [Intro](#intro)
- [How to use this repository](#how-to-use-this-repository)
  - [Tools](#tools)
- [Git commands](#git-commands)
  - [Git aliases | [Docs](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)](#git-aliases----docs--https---git-scmcom-book-en-v2-git-basics-git-aliases-)
  - [Branches](#branches)
  - [Commits](#commits)
  - [Logs](#logs)
  - [Revert](#revert)
  - [Stash](#stash)
  - [⭐️ Extra: Bisect | [link](https://www.metaltoad.com/blog/beginners-guide-git-bisect-process-elimination)](#---extra--bisect----link--https---wwwmetaltoadcom-blog-beginners-guide-git-bisect-process-elimination-)
- [Release and changelog generation](#release-and-changelog-generation)
  - [Installation](#installation)
    - [Install dependencies](#install-dependencies)
    - [Install hooks](#install-hooks)
    - [Add configurations](#add-configurations)
  - [Release process](#release-process)
    - [First release](#first-release)
    - [Next releases](#next-releases)
- [Useful links](#useful-links)
- [Finale](#finale)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

### Tools

It is recommended to use several tools:

- the repository itself cloned to your local environment
- Visual Studio Code
- Git Graph VSCode extension
- installed git command 😅
- installed Node version of at least 16 because of Husky

## Git commands

### Git aliases | [Docs](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)

If you want to speed up writing git commands, you should add aliases to git. Frequently used aliases:

**git checkout**

```bash
# setup alias
git config --global alias.co checkout
# checkout existing branch
git co <oldbranch>
# create new branch
git co -b <newbranch>
```

**git commit**

```bash
# setup alias
git config --global alias.c commit
# create a new commit
git c -m "<message>"
```

**git reset HEAD^1 --soft**

```bash
# setup alias
git config --global alias.uncommit 'reset HEAD^1 --soft'
# remove one commit and add its changes to the staged
git uncommit
```

### Branches

If you want to create new branches, you may know the `branch` command.

```bash
# create a new branch in the local repository
git branch <new_branch_name>
# move to the new branch
git checkout <new_branch_name>
```

or the short command with `checkout`.

```bash
# create a new branch AND move to the new branch
git checkout -b <new_branch_name>
```

If you want to delete your obsolete branch, you can always append the `-D` argument to the `branch` command.

```bash
# delete the branch locally
git branch -D <obsolete_branch>
```

If you know that you deleted the branches on the remote repository and you want to apply those changes locally you can use the following command.

```bash
git fetch --prune
```

ℹ️ If you want to just start with a blank slate, you the following command.

```bash
# It destroys every branch except your master branch
git branch | grep -v "master" | xargs git branch -D
```

🚨 Only works in linux environment.
🚨 Be aware if you have different name for your **master** branch like **main**.

### Commits

Standard example when you want to create a new commit with message.

```bash
# add everything to stage
git add .
# create a commit
git commit -m "<commit_message>"
```

or the short version.

```bash
# add everything to stage AND create a commit
git commit -am "<commit_message"
```

If you made a typo in the commit message.

```bash
# append your staged changes to the previous commit and also rename it
git commit --amend -m "<updated_commit_message>"
```

or if you just forgot something adding to the commit, you can append the `--no-edit` arguments.

```bash
# append your staged changes to the previous commit
git commit --amend --no-edit
```

**Extra**

If you have already pushed your commits to the remote repository you can also use the `--force` argument with the `push` command.

```bash
# update the remote history by force
git push origin <remote_branch> --force
```

🚨 This will override the remote history, thus it is dangerous and often disabled!

### Logs

To check the latest commits on the branch you can always use the `log` command

```bash
# check the last commit
git log -1
# check the last 3 commit
git log -3
```

or even display the logs in a pretty graph format.

```bash
# print a graph based on your local branches and their commit histories
git log --decorate --oneline --graph --all
```

ℹ️ Don't forget to add it as an alias!

```bash
# setup alias
git config --global alias.graph 'log --decorate --oneline --graph --all'
```

ℹ️ It is advised to install the `Git Graph` extension of Visual Studio Code!

### Revert

In case you made a wrong commit and you want to undo your mistakes, you have several options based on if you have already pushed your commit to the remote repository and/or the commit is not on the top of the branch.

If the commit is on the top of your branch you can reset your commit by using the following command

```bash
# delete the last commit and all of its changes
git reset HEAD^1 --hard
```

if you already pushed to your remote branch you have to apply the deletion on the remote as well.

```bash
# update the remote history by force
git push origin <remote_branch> --force
```

🚨 This will override the remote history, thus it is dangerous and often disabled!

If that is not the case, then it is advised to use the `revert` command. By looking at the hash of the right commit you can revert your changes in no time.

```bash
# find the wrong commit
git log
#  create new commit with the opposite changes
git revert <commit_hash>
```

It will create a new commit with the opposite changes of the reverted commit.

### Stash

If you don't want to commit your changes, because maybe you forgot to do something else before, you can stash your changes by using the `stash` command.

```bash
# add changes to the stage
git add # . or specific files
# save it for later
git stash
# ...later
# it adds your last stash to the stage and also deletes this stash
git stash pop
```

ℹ️ If you use the stash more frequently, you can attach name to them.

```bash
# stash your staged changes with a specific name
git stash save <stash_name>
# ...later
# to find what is the index of your stash
git stash list
# add the changes of the stash to your stage.
git stash apply <stash_index>
```

### ⭐️ Extra: Bisect | [link](https://www.metaltoad.com/blog/beginners-guide-git-bisect-process-elimination)

This is not an often used command but can be useful if you want to find an old commit you suspect to be wrong. By starting this command it will jump back and forth between commits and you have evaluate those states to be good or bad. It will logs the hash of the wrong commit. How should you proceed:

```bash
# start the bisect process
git bisect start
# usually if the HEAD commit is wrong
git bisect bad
# find a commit where it worked still well
git bisect good <still_good_commit_id>
```

The **bisect** process will start jumping from commit-to-commit along the history and on every commit, you can evaluate if that commit was good or bad. The most effective way is, if the tests cover the bad behaviour. In this case you can just run your **test command** on every commit the command jumps to.

```bash
# run test
yarn test # or npm run test or anything else
# if it worked
git bisect good
# if not
git bisect bad
```

After this, the process jumps to the next commit and you must evaluate it again with the same strategy. In the end the process will tell you, which commit was the wrongdoer.

```bash
# result can be the following
caf8c7eb4f9e2aa392ae15aa2a920859c19c43bf is the first bad commit
commit caf8c7eb4f9e2aa392ae15aa2a920859c19c43bf
Author: csakbalint <csak.balint@gmail.com>
Date:   Thu Jul 7 22:49:17 2022 +0200

    chore(test): added environment and scripts

 jest.config.js |   13 +
 package.json   |    6 +-
 yarn.lock      | 1897 +++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 3 files changed, 1902 insertions(+), 14 deletions(-)
 create mode 100644 jest.config.js
```

## Release and changelog generation

It's important to provide a good release experience during development, because it helps the other parties to understand, what is the latest state of the software, and how did the code become to that.

ℹ️ This section is not meant to help understanding the whole concept of release strategy but to provide basic tools to introduce it.

### Installation

It might be useful to checkout the `section/conventional-commits` branch, because it contains the necessary changes to introduce the release and versioning

In JavaScript environment, we can use husky, lint-staged, commitlint, conventional-commits, and standard version libraries. With these libraries we can prepare the developers and development environment to be able to create **changelog-ready commits** and generate releases.

What are these libraries and what are they for:

- **husky**: add the ability to use git hooks in Node.js environment
- **commitlint**: enforce naming conventions on commit messages.
- **lint-staged** (optional): help executing scripts only on taged files. It uses husky under-the-hood.
- **standard-version**: generate changelog and release commit. It works with conventional commits.

#### Install dependencies

```bash
# install dependencies
yarn add -D @commitlint/cli @commitlint/config-conventional
yarn add -D husky lint-staged standard-version
```

#### Install hooks

Create commit message hook file

```bash
npx husky add .husky/commit-msg "npx --no -- commitlint --edit "${1}"
```

it will looks like this.

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit "${1}"
```

ℹ️ It should be an executable file, otherwise the git won't run it.

#### Add configurations

Add the following scripts to package.json

```bash
# extend the scripts in package.json
"release": "standard-version",
"release:minor": "standard-version --release-as minor",
"release:patch": "standard-version --release-as patch",
"release:major": "standard-version --release-as major"
# append config to the end of the
"lint-staged": {
  "*.{js,ts}": "eslint --fix"
},
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

Create .versionrc

```bash
{
  "types": [
    {
      "type": "feat",
      "section": "Features"
    },
    {
      "type": "fix",
      "section": "Bug Fixes"
    },
    {
      "type": "chore",
      "hidden": true
    },
    {
      "type": "docs",
      "hidden": true
    },
    {
      "type": "style",
      "hidden": false
    },
    {
      "type": "refactor",
      "hidden": true
    },
    {
      "type": "perf",
      "hidden": true
    },
    {
      "type": "test",
      "hidden": true
    }
  ],
  "commitUrlFormat": "https://github.com/csakbalint/allwin-git-workshop/commit/{{hash}}",
  "compareUrlFormat": "https://github.com/csakbalint/allwin-git-workshop/compare/{{previousTag}}...{{currentTag}}"
}
```

ℹ️ You can configure it freely, based on what you want to be in the changelog.

Create `commitlint.config.js`

```bash
module.exports = { extends: ['@commitlint/config-conventional'] };
```

### Release process

If you want to create a release with the `standard-release` library, it will generate a changelog, based on the previous commit history and creates a commit with the first version found in the package.json. It also attach a version tag to it.

#### First release

For the first you want to execute the following command.

```bash
# create your very own first release
yarn release --first release
# push the release commit with the tag to the remote branch
git push origin <remote_branch> --tags
```

🚨 It is important to push the tags, in case you are not the only developer making releases, because standard-version rely upon tags during releas.

#### Next releases

Whenever you want to create a release, uou must determine, how has your code been changes:

- increase the major version (x.0.0), if any of your existing and used functionalities has been broken.
- increate the minor version (0.x.0), if you introduce new funtionality or feature
- increate the patch version (0.0.x), if fixed one of your broken features.

ℹ️ To fully understand the release process, you should understand the semantic versioning. You can read more about it [here](https://semver.org/).

```bash
# increase major version
yarn release:major
# increate minor version
yarn release:minor
# increate patch version
yarn release:patch
```

It will automatically generates the changes of the changelog, add the option to edit it, then creates a commit and attach a tag.

🚨 Be aware, `standard-version` calculates the changes from the previous tag.

## Useful links

- [Fireship tutorial video](https://www.youtube.com/watch?v=ecK3EnyGD8o)
- [Git Book](https://git-scm.com/book/en/v2)
- [Semantic versioning](https://semver.org/)
- [Convention commits cheatsheet](https://cheatography.com/albelop/cheat-sheets/conventional-commits/)

## Finale

I hope you found this tutorial useful! And keep this in your mind:

![git gut](/assets/git-gut.jpeg)
