FROM node:22
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
#optional
EXPOSE 3010 
CMD ["node", "./src/app.js"]