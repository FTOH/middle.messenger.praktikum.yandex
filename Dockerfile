FROM node
WORKDIR /var/www
COPY . .
RUN npm ci --omit dev --ignore-scripts
RUN npm run build:all
ENV PORT=3000
EXPOSE 3000
CMD npm run server
