
# Description
'Alias Keep' is a desktop application built using Electron, Bulma CSS, and JavaScript. 
The primary purpose of the application is to help users manage and store information related to fake aliases, including details such as fake names, email addresses, phone numbers, and dates of birth. 
The application features a user-friendly interface with different tabs for managing various aspects as well as a rudimentary login screen.

# Instructions
Open root directory
run 'npm start'

## Login Page
Login Page has default credentials set, username: admin | password: password

<img width="579" alt="login" src="https://github.com/Forworddash/AliasKeep/assets/59719097/5477f028-5a7c-4e5a-bb2c-b80eb52ccf2c">


## Account Creation Page
Account Creation Page currently stores local username & password via "localStorage.setItem("createdUsername", createdUsername);" which is 
passed onto the login page.

<img width="563" alt="accountcreation" src="https://github.com/Forworddash/AliasKeep/assets/59719097/7404f367-11bc-438f-aeb8-a532595b36c8">


## Home Page
Home page contains input boxes that will store an array of info:
Full name | Email | Phone number | Date of birth | Gender

<img width="580" alt="generate2" src="https://github.com/Forworddash/AliasKeep/assets/59719097/e41f1b81-8d9a-4b44-9e6f-0a6f04a3a0b5">


## Database Entries
This tab will store any saved data from the generate tab.

<img width="578" alt="saves" src="https://github.com/Forworddash/AliasKeep/assets/59719097/e479086b-69ef-4907-ae53-088acc4c9faa">


## Settings Page
This page has dark mode, language selection, Delete all user data.

<img width="567" alt="settings" src="https://github.com/Forworddash/AliasKeep/assets/59719097/65f6dc97-3648-453c-a273-65fcd59b7522">


## Current issues
- Data is not stored on seperate accounts. If you create 2 accounts, you can see all the stored data between them