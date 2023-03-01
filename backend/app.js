const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');

const config = require('./config/config.json');
const graphqlSchema = require('./graphql/schema.js');
const graphqlResolver = require('./graphql/resolvers.js');

const app = express();

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json({
  limit: '15mb'
}));

app.use(cors());

// graphql endpoint
app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true, // can use the GraphiQL tool to manually issue GraphQL queries
}));

// connect db initialization
const mongoParams = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

mongoose.connect(`${config.db}`, mongoParams)
  .then(() => console.info(`Connected to the ${config.db}`))
  .catch(err => console.error(err));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;