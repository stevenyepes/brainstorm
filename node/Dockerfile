
FROM node:argon

# File Author / Maintainer
MAINTAINER Steven Yepes

# Install nodemon
RUN npm install -g nodemon
RUN npm install -g bower

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

RUN echo '{ "allow_root": true }' > .bowerrc
RUN bower install

# Expose port
EXPOSE  8080

# Run app using nodemon
CMD ["nodemon", "server.js"]
