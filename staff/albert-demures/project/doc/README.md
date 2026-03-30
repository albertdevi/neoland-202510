# News2web

## Introduction

An app for web owners to create and modify news for their website.

![spiderman newspaper](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb201OGo4dmF0MHJubTB4bmFtMWI0a2Npd2duZDE4bW05cXZsdHU3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sRHX9qwNKQaQB48RAM/giphy.gif)

## Functional description

### Use cases

User
- register
- login
- update credentials (username, password, email)
- update profile (project name, profile image, )
- create new
- remove new
- modify new
- filter news

### UI/UX design

[Figma](https://www.figma.com/design/6ptjb1C2zFVXespnkz9Wfm/New2Web?node-id=0-1&p=f&t=dKSOUl63K0pbVyb3-0)


## Technical description

### Blocks

- App (React)
- API (Expess)
- DB (Mongo)

### Packages

- api (handlers, logic, data)
- app (components, logic, data)
- com (errors, validate, regex)
- doc (readme, images)

### Data Model

UserData
- id (unique, string)
- name (required, string)
- email (required, unique, string)
- pasword (required, hashed, string)
- image (string)

NewData
- id (unique, string)
- user (UserData.id, string)
- title (required, string)
- subtitle (string)
- date (required, date)
- paragraphs (required, [string])
- images ([string])
- visibility (required, string, private | public)

### Techs

- HTML / JavaScript / CSS / Tailwind / React / React Router
- Node / Express / Mongo / Mongoose / BCrypt / JWT / curl / Mocha / Chai / Morgan
- Git / Markdown / VSCode / Sublime Merge

## Tracking

[PR](https://github.com/b00tc4mp/neoland-202510/pull/26)