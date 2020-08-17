import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import { root } from './api/index';
import { AppService } from "./service/app.service";
import { DataService } from './service/data.service';
import CacheService from './service/cache.service';
import HttpService from './service/http.service';

// Construct a schema, using GraphQL schema language
const schema: GraphQLSchema = buildSchema(`
  type Post {
    id: ID!
    user: String
    title: String
    score: Int
    age: String
    comments: Int
    rank: Int
  }
  enum Sort {
    asc
    desc
  }
  enum FilterType {
    eq
    ge
    gt
    le
    lt
  }
  input Filter {
    type: FilterType
    amount: Int
  }
  input PostFilter {
    comments: Filter
  }
  input PostOrderBy {
    comments: Sort
  }
  type Query {
    hello: String
    sayHello(name: String!): String!
    posts(page: Int, filter: PostFilter, orderBy: PostOrderBy): [Post]
  }
`);

const cacheService = new CacheService();
const dataService = new DataService();
const httpService = new HttpService('https://news.ycombinator.com');
const appService = new AppService(cacheService, dataService, httpService);

const app: express.Express = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

export { appService };
