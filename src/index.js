const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => {
      let link = links.find(l => {
        return l.id === args.id;
      });
      return link;
    }
  },

  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      let link = links.find(l => {
        return l.id === args.id;
      });
      link['url'] = args.url;
      link['description'] = args.description;
      return link;
    },
    deleteLink: (root, args) => {
      link = links.find(l => l.id === args.id);
      links.pop(link);
      console.info(links);
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});
server.start(() => {
  console.info(`Server is running on http://localhost:4000`);
});
