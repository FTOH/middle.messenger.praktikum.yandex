FROM node
WORKDIR /var/www
COPY . .
RUN npm ci --omit dev --ignore-scripts
RUN npm build:all
EXPOSE 3000
CMD npm run server
