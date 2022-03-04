## BLOCK-writeCode

#### path
Q. Suppose on desktop, inside projects we have 2 folder each with a file
Structure is:-
Desktop
  - projects
    - client(dir)
      - index.js
    - server(dir)
      - app.js

You are currently in server.js

Write code to
  - get relative path of `index.js` 
  - get absolute path of `index.js`

#### server
Create a basic http server which should grab data from a HTML form rendered on a specific route and display the content on a seperate page.

Folder structure is:-

Project folder
  - server.js
  - form.html(html form)

form.html is a basic html form with multiple inputs. Each input except input of `type=submit` must contain `name` attribute which is the key for value submitted on that specific input.
- name
- email
- age

lastly also add an `input type=submit` to submit the form

Write code inside `server.js` to
- create a basic server
- add listener on port 5678
- display the form.html page on `/form` route using `GET` http method
- once the form is submitted, capture the data on server side using `data/end` event on request object
- make sure to add `method` and `action` attribute to `HTML form` in form.html
- send captured data in response as html page 

You have to basically handle 2 routes
1. to display the form data -> GET on `/form` route
2. to capture data from form and display it -> POST on `/form` route

##### Note:-
- action attribute determines the route which will be requested on server side
- method defines HTTP method used to submit the form(ideally POST)