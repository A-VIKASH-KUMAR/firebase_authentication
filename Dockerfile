FROM node:slim

COPY . .

RUN npm init -y&&npm install&&npm install --save-dev typescript
RUN npm run build
RUN cd dist
CMD node index.js