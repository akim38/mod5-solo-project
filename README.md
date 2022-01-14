# PokeMeetup

<a href="https://pokemeetup.herokuapp.com/">PokeMeetup</a>, based off of <a href="https://www.meetup.com/">Meetup</a>, is a website where Pokemon Trainers and fans can sign up, view and create Pokemon related events, and create and join groups that fit their interests.

## Index
* Feature List
* React Components
* Database Schema
* Frontend Routes
* API Routes Document
* Redux Store Tree Document

## Summary
* Splash Page
![Screenshot 2022-01-14 063200](https://user-images.githubusercontent.com/89177551/149532132-75227545-93ad-4c57-a672-651e3fa00a7f.jpg)
* Events List
![Screenshot 2022-01-14 063328](https://user-images.githubusercontent.com/89177551/149532361-a8ac3d2c-1458-4d8c-8d22-b40135a7ab49.jpg)
* Events Detail 
![Screenshot 2022-01-14 063419](https://user-images.githubusercontent.com/89177551/149532522-25cffb71-d490-4217-93be-5fcdba8b7439.jpg)

 


## Technologies Used
* bcryptjs
* cookie-parser
* csurf
* dotenv
* express
* helmet
* jsonwebtoken
* morgan
* per-env
* pg
* sequelize
* dayjs
* react
* react-dom
* react-redux
* react-router-dom
* react-scripts
* redux
* redux-thunk


## Launching Locally

1. Clone the project repository
```
   git clone https://github.com/akim38/mod5-solo-project.git
```

2.  Create a local .env file modeled after the .env.example file in the backend directory
```
   PORT=8080
   DB_USERNAME=recipeople_admin
   DB_PASSWORD=your_unique_password
   DB_DATABASE=recipeople
   DB_HOST=localhost
   SESSION_SECRET=your_session_secret
```
3. Install dependencies in both the backend and frontend directory
```
    npm install
```
4. Migrate and seed the database from the backend directory
 ```
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
```

5. Run the project with a starting script in both backend and frontend directories
 ```
    npm start
 ```

 You should now be able to navigate to http://localhost:3000 and use the application!



## To-Do's / Future Features 
* Groups Feature
* Search Feature
