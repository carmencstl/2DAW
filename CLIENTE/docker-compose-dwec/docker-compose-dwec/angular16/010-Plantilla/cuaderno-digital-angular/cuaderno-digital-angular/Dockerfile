# Dockerfile para Cuaderno Digital Angular 16

# Etapa de desarrollo
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto 4216
EXPOSE 4216

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:docker"]
