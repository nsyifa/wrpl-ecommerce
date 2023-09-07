# Reverie E-Commerce Website
![image](https://github.com/nsyifa/wrpl-ecommerce/assets/89928533/7043fab9-9ebb-4280-ae0e-20d3821bc6b4)

Reverie is a full-stack e-commerce website demo for a fashion, perfume, and skincare/cosmetics retailer. Made with a React.js frontend, Node.js backend, and a local MySQL database.

## Features
   1) Landing page
   2) User log-in and registration
   3) Product catalogue with filtering and sorting
   4) Shopping cart
   5) Checkout page with integrated shipping cost calculation feature using RajaOngkir API
   6) Payment using Midtrans payment gateway API

## Screenshots
![image](https://github.com/nsyifa/wrpl-ecommerce/assets/89928533/36c3a14e-e616-4531-ad18-cba685176536)
![image](https://github.com/nsyifa/wrpl-ecommerce/assets/89928533/a40746ac-5718-429c-ade3-483d7be13782)
![image](https://github.com/nsyifa/wrpl-ecommerce/assets/89928533/a10eb120-f94f-4ee2-98b6-b5ab41c68245)
![image](https://github.com/nsyifa/wrpl-ecommerce/assets/89928533/f86568b0-8dfd-4eb0-88f6-b943e3802250)
![image](https://github.com/nsyifa/wrpl-ecommerce/assets/89928533/490f657d-bf46-43ea-99d5-cd7083366bb4)
![image](https://github.com/nsyifa/wrpl-ecommerce/assets/89928533/6ef6f32d-2468-4d27-bce6-0d4a5b93f90b)

## Drive Link (Documentation and database)
https://drive.google.com/drive/u/0/folders/13fD4w3zE_djtIpPpfn_JI_DmtZFs9mhy

## Requirements:
1) Node.js
2) MySQL

## How to run the backend servers:
1) Make sure that you have all the needed databases in your local MySQL (you can download them through the drive link above).
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






