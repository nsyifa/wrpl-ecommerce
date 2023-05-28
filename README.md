# 4kiddos

## Link Drive
https://drive.google.com/drive/folders/1htCgO5FRlL0djQy3NOuWSHoEGXxx9I_R?usp=share_link

## Requirements:
1) Sudah install Node.js

## Cara ngerun backend:
1) Pastikan semua database e-commerce sudah ada di lokal mysql server (pastikan udah up-to-date)
2) di cd backend-node:  
![image](https://user-images.githubusercontent.com/89928533/227906983-16fb10d9-4cb8-492c-b608-ce89ade4fa2f.png)  
run command 'npm install'
4) Di file db.config.js di folder config, ubah datanya supaya sesuai sama database lokal masing-masing
![image](https://user-images.githubusercontent.com/89928533/227908009-749c9978-4dfb-4fda-a5ca-49becef85008.png)
3) run command 'node server.js' untuk ngerun backend.
4) Kalau sudah connected, di terminal akan keluar:  
![image](https://user-images.githubusercontent.com/89928533/227908593-ed5863df-bc1b-4665-a15e-8c027873b47c.png)  
### Ulangi langkah-langkah di atas untuk setiap backend

## Cara ngerun frontend:
1) di file package.json, hilangin brainhubeu-react carousel dari dependencies:  
![image](https://user-images.githubusercontent.com/89928533/227909896-69307eaa-10ba-47ed-8c76-b3cec7302c94.png)
2) di file package-lock.json, juga hilangin brainhubeu-react carousel dari dependencies:  
![image](https://user-images.githubusercontent.com/89928533/227910130-ff36c54b-7037-4a74-9c9e-5c0bdafd9581.png)
3) di cd frontend:  
![image](https://user-images.githubusercontent.com/89928533/227909704-a097d3b2-929c-45f8-9f10-60632e97cae9.png)  
run 'npm install'
4) run command 'npm i @brainhubeu/react-carousel --legacy-peer-deps'
5) run command 'npm run start' untuk ngerun frontend

## Agar frontend + backend dua-duanya jalan, run keduanya di terminal yang terpisah

## Cara install package:
1) di file package.json, hilangin brainhubeu-react carousel dari dependencies:  
![image](https://user-images.githubusercontent.com/89928533/227909896-69307eaa-10ba-47ed-8c76-b3cec7302c94.png)
2) di file package-lock.json, juga hilangin brainhubeu-react carousel dari dependencies:  
![image](https://user-images.githubusercontent.com/89928533/227910130-ff36c54b-7037-4a74-9c9e-5c0bdafd9581.png)
3) di cd frontend, install package npmnya secara normal ('npm install [package name]')
4) run command 'npm i @brainhubeu/react-carousel --legacy-peer-deps'






