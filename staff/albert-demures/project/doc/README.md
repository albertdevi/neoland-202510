# News2web

## Introduction

An app to create and modify articles, then turn them into customizable reels that can be embedded in iframes and shared across multiple platforms.

![spiderman newspaper](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb201OGo4dmF0MHJubTB4bmFtMWI0a2Npd2duZDE4bW05cXZsdHU3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sRHX9qwNKQaQB48RAM/giphy.gif)

## Functional description

### Use cases

User
- register
- login
- update credentials (username, password, email) (future version)
- update profile (project name, profile image, ) (future version)
- create article
- remove article
- modify article
- filter articless (future version)
- modify reel colors (text and background color)
- generate a  embed code of the reel for iframe 

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

ArticleData
- id (unique, string)
- user (UserData.id, string)
- title (required, string)
- subtitle (string)
- date (required, date)
- paragraph0 (required, string)
- paragraph1 (string)
- paragraph2 (string)
- paragraph3 (string)
- image0 (string)
- image1 (string)
- image2 (string)
- image3 (string)
- visibility (required, string, private | public)

ReelData
- id (unique, string)
- user (UserData.id, string)
- textColor (string)
- backgroundColor (string)

### Techs

- HTML / JavaScript / CSS / Tailwind / React / React Router
- Node / Express / Mongo / Mongoose / BCrypt / JWT / curl / Mocha / Chai / Morgan
- Git / Markdown / VSCode / Sublime Merge

## Tracking

[PR](https://github.com/b00tc4mp/neoland-202510/pull/26)