const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
} = graphql;
const axios = require("axios");

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    id: {type: GraphQLString},
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    details: { type: GraphQLString },
    success: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launch: {
      type: LaunchType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v5/launches/${args.id}`)
          .then((res) => res.data);
      },
    },
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v5/launches")
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
