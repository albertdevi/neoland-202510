![Bash image](https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Gnu-bash-logo.svg/1200px-Gnu-bash-logo.svg.png)

# BASH
Comandos in BASH terminal.

## pwd

Path to working directory

```sh
$ pwd
/Users/b00tc4mp/workspace
```

## ls

List files and folders

```sh
$ ls
neoland-202510/
```

## ls -l

List files and folders [directories]

```sh
$ ls -l
total 0
drwxr-xr-x 1 zuko 197121 0 Oct 22 21:36 neoland-202510/
```

## mkdir folder-name

Creates a folder with the provided name

```sh
$ mkdir workspace
```

## touch

Creates an empty file with given name

```sh
$ touch readme.txt
```

## chmod rwx file-name/folder-name

Updates permissions in given file or folder

```sh
$ chmod 700 readme.txt
```

## nano file-name

Opens a given file in the Nano editor.

```sh
$nano readme.txt
```

## rm file-name

Removes a given file from system

```sh
rm readme.txt
```

## rmidr folder-name

Removes a given folder when is empty

```sh
$rmidr temp
```

## cd

Changes from current folder to the given folder path.

```sh
$ cd workspace
```

## ls -a

Shows invisible and hidden files and folders in give path

```sh
$ ls -a
./  ../  .git/  staff/
```