
# Yurillium SNS API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This is an API created for social networking service. You can create users and thoughts to share thoughts within users. Also, you can add users to your friends list and post reactions to their thoughts! Try ME!!

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)

## Installation
1. Install node and git clone this repo
2. Install npm packages by following command:
   ```
   npm i
   ```

## Usage
Watch the [walk through video](https://drive.google.com/file/d/1UdPLOEvW7tDFUDd3Ly2tZumUqINbekg9/view)!<br/>
Default localhost link: http://localhost:3002/
1. Start the app by the following command: 
   ```
   npm start
   ```
   (you can also use `npm run watch` to run with nodemon)
2. Users operations:
    - /api/users
        - `GET` all the users
        - `POST` a user to create
    - /api/users/:id
        - `GET` a single user by its id
        - `PUT` a user to update by its id
        - `DELETE` a user by its id
3. Thoughts operations: 
    - /api/thoughts
        - `GET` all the thoughts
        - `POST` a thought with username and the user's id
    - /api/thoughts/:id
        - `GET` a single thought by its id
        - `PUT` a thought to update by its id
        - `DELETE` a thought by its id
4. Friends list operations:
    - /api/users/:userId/friends/:friendId
        - `PUT` a user by its id to add a friend by friend's id
        - `DELETE` a friend by its id to remove a friend from the user's friend list
5. Reactions operations: 
    - /api/thoughts/:thoughtId/reactions
        - `PUT` a thought by its id to post a reaction to the thought
    - /api/thoughts/:thoughtId/reactions/:reactionId
        - `DELETE` a reaction by its id to remove it from a thought

## License
Licensed under the [MIT License](https://opensource.org/licenses/MIT).
      

## Questions
- GitHub Profile: https://github.com/YuriI92
- If you have any additional questions, please feel free to contact me by email.
  E-mail Address: <yurichikawa1992@gmail.com>
      
  