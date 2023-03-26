FROM node:18.14.1-alpine

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

USER node
COPY --chown=node:node package*.json ./
RUN npm ci --only=production

COPY --chown=node:node . .

EXPOSE 3001

CMD ["npm", "start"]
