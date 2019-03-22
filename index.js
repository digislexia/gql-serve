const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    id: 2,
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
  {
    id: 3,
    title: 'Harry Potter',
    author: 'J.K. Rowling',
  },
  {
    id: 4,
    title: 'Chamber of Secrets',
    author: 'Michael Crichton',
  },
];

const users = [
    {
        id: 1,
        name: 'Petr',
        gender: 0,
        books: [
            {
                id: 3,
                title: 'Harry Potter',
                author: 'J.K. Rowling',
            },
            {
                id: 4,
                title: 'Chamber of Secrets',
                author: 'Michael Crichton',
            }
        ]
    },
    {
        id: 2,
        name: 'Slava',
        gender: 1,
        books: [
            {
                id: 1,
                title: 'Harry Potter and the Chamber of Secrets',
                author: 'J.K. Rowling',
            },
            {
                id: 2,
                title: 'Jurassic Park',
                author: 'Michael Crichton',
            },
            {
                id: 4,
                title: 'Chamber of Secrets',
                author: 'Michael Crichton',
            }
        ]
    }
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    id: Int
    title: String
    author: String
  }

  type User {
      id: Int
      name: String
      gender: Int
      books: [Book]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    users: [User]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    users: () => users,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});