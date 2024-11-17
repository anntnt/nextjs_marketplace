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
} from '../../../database/cartProducts';
import { createSessionInsecure } from '../../../database/sessions';
import type { Resolvers } from '../../../graphql/graphqlGeneratedTypes';
import { secureCookieOptions } from '../../../util/cookies';

export type Context = {
  sessionTokenCookie?: { value: string };
};

export type GraphqlResponseBody =
  | {
      cartProduct: ProductFromCart;
    }
  | Error;

const typeDefs = gql`
  type ProductFromCart {
    id: ID!
    name: String!
    price: Number!
    imageUrl: String!
    quantity: Number!
  }

  type Query {
    productsFromCart: [ProductFromCart]
    productFromCart(id: ID!): ProductFromCart
  }

  type Mutation {
    deleteProductFromCart(id: ID!): ProductFromCart

    updateProductFromCart(
      id: ID!
      name: String!
      price: ID!
      imageUrl: String!
      quantity: ID!
    ): ProductFromCart
  }
`;

const resolvers: Resolvers = {
  Query: {
    productsFromCart: async () => {
      return await getCartProducts(context.sessionTokenCookie.value);
    },
  },

  /*Mutation: {
    updateProductFromCart: async (parent, args, context) => {
      if (!context.sessionTokenCookie) {
        throw new GraphQLError('Unauthorized operation');
      }

      if (
        typeof args.firstName !== 'string' ||
        typeof args.type !== 'string' ||
        (args.accessory && typeof args.type !== 'string') ||
        !args.firstName ||
        !args.type
      ) {
        throw new GraphQLError('Required field missing');
      }

      return await updateProductFromCart(e.value, {
        id: Number(args.id),
        firstName: args.firstName,
        type: args.type,
        accessory: args.accessory || null,
      });
    },

    deleteProductFromCart: async (parent, args, context) => {
      if (!context.sessionTokenCookie) {
        throw new GraphQLError('Unauthorized operation');
      }

      return await deleteProductFromCart(
        context.sessionTokenCookie.value,
        Number(args.id),
      );
    },
  },*/
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

const apolloServerRouteHandler = startServerAndCreateNextHandler<NextRequest>(
  apolloServer,
  {
    context: async (req) => {
      return {
        sessionTokenCookie: await req.cookies.get('sessionToken'),
      };
    },
  },
);

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
