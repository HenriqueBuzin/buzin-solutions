FROM node:18-alpine

WORKDIR /buzin_solutions_react

ENV PATH /buzin_solutions_react/node_modules/.bin:$PATH

COPY package.json /buzin_solutions_react/package.json

RUN npm install
RUN npm install react-scripts@5.0.1 -g

CMD ["npm", "start"]
