FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx nest build

EXPOSE 3000

CMD ["node", "dist/main.js"]
