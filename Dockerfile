# Initialiser la base node
FROM node:21.3.0-alpine3.17 as base

#Définition du répertoire
WORKDIR /app

# Copie du package json
COPY package.json ./
COPY package-lock.json ./

#Installation des dépendances
RUN npm install

# Copie du code de l'app
COPY . .

#Construction de l'app remix
RUN npm run build

#Exposition du port 
EXPOSE 8080

#Initialisation des commandes à utiliser
CMD ["npm", "start"]

#Migration de prisma
RUN npx prisma migrate deploy