ARG PORT=4000
ARG DATABASE_URL
ARG APP_SECRET
ARG NODE_ENV

FROM node:14-alpine

# Use /app as the CWD
WORKDIR /app            

# Copy package.json and package-lock.json to /app
COPY package*.json ./   

RUN echo 'secret => $APP_SECRET'

# Install all dependencies
RUN npm i               

# Copy the rest of the code
COPY . .

ENV DATABASE_URL=postgres://Jayne:jta705cotnLCGlm3WOd4@jayne-web-db.csk8comatruy.us-east-2.rds.amazonaws.com/postgres
ENV APP_SECRET=$APP_SECRET
ENV NODE_ENV=$NODE_ENV

# Invoke the build script to transpile ts code to js
RUN npm run next-build    

# Invoke the build script to transpile ts code to js
RUN npm run build

# Open desired port
EXPOSE ${PORT}

# Run development server
ENTRYPOINT [ "npm", "run", "start" ]
