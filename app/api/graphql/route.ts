import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from 'graphql';
import { cookies } from 'next/headers';
import type { NextRequest, NextResponse } from 'next/server';
import {
  getCartProducts,
  type ProductFromCart,
} from '../../../databasegraphql/cartProducts';
import {
  getProductsInsecure,
  type Product,
} from '../../../databasegraphql/products';
import { createSessionInsecure } from '../../../databasegraphql/sessions';
import type { Resolvers } from '../../../graphql/graphqlGeneratedTypes';
import { secureCookieOptions } from '../../../util/cookies';

export type Context = {
  sessionTokenCookie?: { value: string };
};

export type GraphqlResponseBody =
  | {
      product: Product;
    }
  | Error;

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: ID!
    imageUrl: String!
    description: String!
    size: String
    color: String
    sellerId: ID!
    categoryId: ID!
  }

  type Query {
    products: [Product]
  }
`;

const resolvers: Resolvers = {
  Query: {
    products: async () => {
      return await getProductsInsecure();
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

const apolloServerRouteHandler =
  startServerAndCreateNextHandler<NextRequest>(apolloServer);

export async function GET(
  req: NextRequest,
): Promise<NextResponse<GraphqlResponseBody>> {
  return (await apolloServerRouteHandler(
    req,
  )) as NextResponse<GraphqlResponseBody>;
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GraphqlResponseBody>> {
  return (await apolloServerRouteHandler(
    req,
  )) as NextResponse<GraphqlResponseBody>;
}
