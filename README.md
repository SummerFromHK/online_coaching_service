# online_coaching_service

This is a web app that enables coach and students to connect and meet for 1-1 coaching session that each lasts 2 hours.

## Running locally

- clone repo
- run .sql script to create db tables
- run `npm install` (if applicable)
- run `npm run dev`
- hit http://localhost:{portNumber} on browser
- run sql script in `script.sql` on your db client

## Tech stack

- next.js
- react
- mysql database
- libraries
  - axios (for http requests)
  - material ui (for ui components)
  - mysql 2 (for sql)
  - moment (for date formatting and timezone conversion)

## Set up

    - server
    	- 3-tier architecture:
    		- controller
    		- service
    		- repository layer
    - frontend
    	- simple react app set up
    - database
    	- RDS mySql database
    	- client: sqlectron

- project structure (folders organized by next.js routing)
  - srcs/app/
    - api
    - component
      - client/views
      - server
    - pages

## Things I would do if I had more time (in order)

- (Unfinished user stories) Add "add feedback" button to enable coaches to add satisfaction and notes for completed sessions
- error handling
  - frontend: user input validation and friendly error message display
  - server: enhanced error types and messages on ApiWrapper
- use global state management on the frontend
- polish UI to enhance user experience
  - replace textInput with date picker component from MUI, to leverage some of its out of the box input validation
  - use a calendar view for slots display and booking for better UX
