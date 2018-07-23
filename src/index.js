const { Prisma } = require('prisma-binding');
const { GraphQLServer } = require('graphql-yoga');

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info);
    },
  },

  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description
        }
      }, info)
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
      secret: 'mysecret123',
      debug: true
    })
  })
});
server.start(() => {
  console.info(`Server is running on http://localhost:4466`);
});
