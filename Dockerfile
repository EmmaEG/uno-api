# Utiliza una imagen oficial de Node.js como base
FROM node:20.11.1

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /uno-vehiculos-backend

# Copia todos los archivos del directorio actual al directorio de trabajo en el contenedor
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

# Expone el puerto 4000 para que pueda ser accesible desde fuera del contenedor
EXPOSE 4000

# Comando para ejecutar la aplicación cuando el contenedor se inicia
CMD ["node", "index.js"]
