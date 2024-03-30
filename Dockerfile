FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Change timezone
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && echo 'America/Sao_Paulo' > /etc/timezone

# Install Jemalloc
RUN apt-get update && apt-get install libjemalloc-dev -y && apt-get clean
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so" 

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 7986

# Serve the app
CMD ["npm", "run", "prod"]