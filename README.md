# Reverie

## Link Drive
[link]

## Requirements:
1) Node.js
2) MySQL

## How to run the backend servers:
1) Make sure that you have all the needed databases in your local MySQL.
2) Open the project folder in VSCode (or another terminal/IDE)
3) For each of the backend folders, you have to:
   a) go to the backend folder directory by typing cd [backend folder name]
   b) run the command 'npm install'
   c) In the db.config.js file located in the config folder, change the data to suit your local MySQL configurations
   d) Run the command 'node server.js' to run the backend.
4) If the backend has been run successfully, the terminal will output:  
![image](https://user-images.githubusercontent.com/89928533/227908593-ed5863df-bc1b-4665-a15e-8c027873b47c.png)  

## How to run the frontend:
1) In the package.json file, remove brainhubeu-react carousel from the dependencies:  
![image](https://user-images.githubusercontent.com/89928533/227909896-69307eaa-10ba-47ed-8c76-b3cec7302c94.png)
2) In the package-lock.json, also remove brainhubeu-react carousel from the dependencies:  
![image](https://user-images.githubusercontent.com/89928533/227910130-ff36c54b-7037-4a74-9c9e-5c0bdafd9581.png)
3) In cd frontend:  
![image](https://user-images.githubusercontent.com/89928533/227909704-a097d3b2-929c-45f8-9f10-60632e97cae9.png)  
run 'npm install'
4) run command 'npm i @brainhubeu/react-carousel --legacy-peer-deps'
5) run command 'npm run start' to start the frontend.

## Run all the frontend and backend in separate terminals 






