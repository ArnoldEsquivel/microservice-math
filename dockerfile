# Stage 1: Build the application
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para construir)
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm install --production

# Copiar los archivos construidos desde el stage de construcción
COPY --from=builder /app/dist ./dist

# Copiar los node_modules desde el stage de construcción
COPY --from=builder /app/node_modules ./node_modules

# Exponer el puerto en el que la aplicación corre
EXPOSE 3000

# Definir la variable de entorno para producción
ENV NODE_ENV=production

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
