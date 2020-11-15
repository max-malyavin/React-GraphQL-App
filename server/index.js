const { ApolloServer, PubSub } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs.js");
const { MONGODB } = require("./config.js");
const resolvers = require("./graphql/resolvers/index.js");
// const Post = require("./models/Post.js");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("База данных успешно подключена!");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Сервер запустился на порту ${res.url}`);
  });
