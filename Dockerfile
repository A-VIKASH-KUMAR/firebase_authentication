FROM node:alpine

WORKDIR /firebase-authentication
RUN cd /firebase-authentication
COPY . .

RUN npm install&&npm install --save-dev typescript
RUN npm run build
EXPOSE 3001
CMD node dist/index.js