# Final Project - TodoList Application

This project is a final project which is TodoList Application.

# Description

In this app, user can:

    1 - get list of todos from server where user save to last time

    2 - create new task in list

    3 - update/edit task (task content or check/uncheck task)

    4 - delete task

    5 - search tasks

    6 - sort task (with direction of descending or ascending) by:

            a - time added

            b - task title

            c - last time tasks were modified

    7 - filter tasks by:

            a - completed tasks (which is "done")

            b - uncompleted tasks (which is "working")

            c - both completed and uncompleted tasks (which is "All")

    8 - paginate pages by numbers of task on each page by (max = 20 todos/page):

            a - choosing an increasing step of 5

            b - choosing an increasing step of 1

# Install and Run

1. Before installing and run the project, user need to create an account on <a href="https://airtable.com/" target="_blank">airtable</a>

This is the place for saving data on cloud server.

In airtable account user need to do these steps:

    a) Create a workplace ==>> maybe "My First Workspace"

    b) In workplace ""My First Workspace" ==>> create a new "Base" (or airtable will create "Untitled Base" automatically when click button "Create")

    c) In "Untitled Base" there is a "Table 1" (or user can change the name ==>> "Todos")

    d) In "Untitled Base" => "Todos" => Click "Help" menu and choose "API documentation" on dropdown menu

    e) Under "Introduction" heading, there is line "The ID of this base is xxxxx"

    f) Copy only "xxxxx" and save it somewhere with variable name "VITE_BASE_ID = xxxxx"

    g) In "Untitled Base" => "Todos" table => Update the first field name so that it reads "title" instead of "Title"

    h) Delete the other fields

    i) Now add a field name "isCompleted" with "Checkbox" type

    j) Add a new field name "createdTime" with some setting:
        => field type => "Date"
        => Date format => Local and turn on "Include time"
        => Time format => 24 hour and turn on "Use the same time zone for all collaborators"
        => Time zone => GMT/UTC
        => Default option => turn on "Default to"

    k) Add a new field name "lastModified" with some setting:
        => field type => "Last modified time"
        => Fields => Choose "All editable fields"

    l) Click on profile picture to open menu

    m) Select "Builder hub"

    n) Select "Create new token"

    o) Give the token a name that you'll remember

    p) Click "Add a scope" and choose these items ==>> "data.records:read" and "data.records.write"

    q) Under the "Access" heading. Hit "Add a base" and choose your new one.
       ==>> or can choose "All current and future bases in this workspace"

    r) Hit "Save changes" and copy the "token" value that shows on the next screen (save it somewhere with name "VITE_PAT=token")

2.  Clone this project to local directory

3.  In local directory open VSCode, open terminal and run command:

        **npm install**

VSCode will install all dependencies

4.  Create file ".env.local" in local directory which contain:

        VITE_PAT = token which just saved above
        VITE_BASE_ID = base ID which just saved above
        VITE_TABLE_NAME = Todos

5.  Check again in file ".gitignore" whether it has these line:

        .env.local
        .env

6.  Open terminal and run command:

        **npm run dev**

to run the program.

7.  Open http://localhost:5173/ to view it in browser.
