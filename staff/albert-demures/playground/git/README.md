![Git image](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1024px-Git-logo.svg.png)

# Git - The Stupid Content Tracker

Git comands in terminal.

## git init

Initializes a local folder as a repository.

```sh
$ git init
Initialized empty Git repository in C:/Users/zuko/workspace/neoland-202510/.git/
```

## git remote add repo-address

Connects the local repository to its origin in GitHub.

```sh
$ $ git remote add origin https://github.com/albertdevi/neoland-202510
```

## git pull

Pulls all the changes from remote (origin) repository.

```sh
$ git pull
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 4 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (4/4), 1.84 KiB | 85.00 KiB/s, done.
From https://github.com/albertdevi/neoland-202510
 * [new branch]      main       -> origin/main
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> master

```

## git branch -a

Shows all the branches in the repository

```sh
$ git branch -a
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
  ```

## git switch main

Changes the branch to the given one.

```sh
$ git switch main
branch 'main' set up to track 'origin/main'.
```

## git branch

Shows the local branches.
```sh
$ git branch
* main
```

## git status

SHow the status of files in local repo.

```sh
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        staff/

nothing added to commit but untracked files present (use "git add" to track)
```

## git add content-name

Adds content to staging.

```sh
$ git add staff
```

## git config setting

Configures settings in local git.

```sh
$ git config user.email "albertdemures@gmail.com"

$ git config user.name "Albert Demures
```

## git commit -m message

Consolidates the changes in local repository.

```sh
$ git commit -m "add bash and git docs"
```

## git push

Pushes the changes from local to rempote repository (origin).

```sh
 git push
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (9/9), 2.02 KiB | 414.00 KiB/s, done.
Total 9 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/albertdevi/neoland-202510
   c0018b0..3d6eb45  main -> main
```

## git log

Shows commits history ordered descending by time

```sh
$ git log
commit 2397833e9f3b82ebd6f2ac1de5b02448041ffe34 (HEAD -> main, origin/main, origin/HEAD)
Author: Albert Demures <albertdemures@gmail.com>
Date:   Thu Oct 23 22:07:12 2025 +0200

    add git commit and git push command to git doc

commit 3d6eb453983e8f238e7c036bf220baa629d254d4
Author: Albert Demures <albertdemures@gmail.com>
Date:   Thu Oct 23 21:52:28 2025 +0200
```