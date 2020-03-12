FROM node:8.11.4
ENV PORT 3000
LABEL author="César Delgado" maintainer="cesar.delgado.arcos@gmail.com"

COPY ./ .
RUN npm install

CMD ["node", "start"]