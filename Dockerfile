FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm run installs



CMD [ "npm", "run", "start" ]

EXPOSE 8000