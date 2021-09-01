# FoodUs-app

Bienvenidos a la aplicación **FoodUs**! En la que podrás encontrar recetas a tu gusto.

<img src="https://github.com/alemandor1/FoodUs-app/blob/master/imagesReadme/home.jpeg" width="200"> <img src="https://github.com/alemandor1/FoodUs-app/blob/master/imagesReadme/login.jpeg" width="200"> <img src="https://github.com/alemandor1/FoodUs-app/blob/master/imagesReadme/main.jpeg" width="200"> <img src="https://github.com/alemandor1/FoodUs-app/blob/master/imagesReadme/foodlist.jpeg" width="200">

<img src="https://github.com/alemandor1/FoodUs-app/blob/master/imagesReadme/camara.jpeg" width="200"> <img src="https://github.com/alemandor1/FoodUs-app/blob/master/imagesReadme/suggested.jpeg" width="200"> <img src="https://github.com/alemandor1/FoodUs-app/blob/master/imagesReadme/shopping.jpeg" width="200"> <img src="https://github.com/alemandor1/FoodUs-app/blob/master/imagesReadme/profile.jpeg" width="200">

# SetUp

En este apartado de detalla mediante una serie de pasos el proceso de instalación y lanzamiento de la aplicación móvil FoodUs.

Antes que nada, habrá que tener instalado la herramienta **Visual Studio Code** (https://code.visualstudio.com/download), **Node.js** (https://nodejs.org/es/download/) y una versión de **Python** (https://tutorial.djangogirls.org/es/python_installation/) en el ordenador para proceder a la instalación del proyecto,
y en el dispositivo móvil la aplicación **Expo** del Play Store (https://play.google.com/store/apps/details?id=host.exp.exponent&hl=es&gl=US).

**IMPORTANTE:** Hay que tener bien configuradas las variables de entorno de **Python** y **Node.js**. También, es obligatorio que el móvil y el ordenador se encuentren conectados a la misma red.


Para proceder a la inslatación y ejecución de la app hay que seguir los siguientes pasos:

  **1-** Descargarse el proyecto .zip (FoodUs-app) y descomprimir la carpeta.
  
  **2-** Abrir el enlace: (https://drive.google.com/drive/folders/1Ju_JTsBZeS9Z6q2fgY3j1xBy63hvPR1l), descargar el ZIP "weights":
  
  <img src="https://github.com/alemandor1/FoodUs-app/blob/master/imagesReadme/descarga.jpg" width="600">
   
  **3-** Descomprimir el ZIP, abrir la carpeta descomprimida y añadir la carpeta "weights" a la carpeta del proyecto del **PASO 1** (FoodUs-app), quedando finalmente así:
  
  <img src="https://github.com/alemandor1/FoodUs-app/blob/master/imagesReadme/carpetaWeights.png" width="600">
  
  **4-** Arrancar la herramienta Visual Studio Code y abrir la carpeta del proyecto. (File -> Open Folder...)  

  **5-** En Visual Studio Code abrir una terminal (T1) y ejecutar el comando: "**npm install**".

  **6-** Abrir una segunda terminal (T2) y ejecutar el comando: "**pip install -r requirements-gpu.txt**".
   
   Si salta un error con respecto a alguna dependencia, habrá que desinstalarla primero con el comando "**pip uninstall nombreDependencia**" y luego volver a ejecutar **el paso 3**. 
  
  **7-** Al terminar los pasos 2 y 3, ejecutar el comando: "**python app.py**" en la segunda terminal (T2).

  **8-** Al terminar los pasos 2 y 3, ejecutar el comando: "**npm start**" en la primera terminal (T1).

  **9-** Tras ejecutar el comando anterior, se abrirá el navegador web que mostrará un código QR.

  **10-** Desde la aplicación Expo Go del dispositivo móvil escaneamos el código QR.

  **11-** Por último, habrá que esperar unos segundos a que se construya el proyecto.

  **12-** Ya tendremos la aplicación lanzada correctamente y estará lista para usarla con total libertad.
