FROM node:18-alpine
WORKDIR /usr/project/chat
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm" ,"start"]