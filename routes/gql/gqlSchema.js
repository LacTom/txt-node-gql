const { buildSchema } = require("graphql");

const gqlSchema = buildSchema(`
# this is just a comment graphql
enum BU {
    #business unit
    DIMI
    DINE
    DINO
  }
"""
Person object
"""
type Person {
    _id: ID
    firstName: String
    lastName: String
    """
    Knowledge of Node
    """
    knowsNodeJs: Boolean
    birthDate: String
    city: String
    """
    The Business unit this person belongs to
    """
    BU: BU
}
input PersonInputCreate {
    firstName: String!
    lastName: String!
    knowsNodeJs: Boolean
    birthDate: String
    city: String
    BU: BU
}
input PersonInput {
    firstName: String
    lastName: String
    knowsNodeJs: Boolean
    birthDate: String
    city: String
    BU: BU
}
type Query {
  list: [Person] 
  get(id: ID!): Person
}
type Mutation {
    create(data: PersonInputCreate!): Person
    update(id: ID!, data: PersonInput!): Person
    delete(id: ID!): String
}
`);

module.exports = gqlSchema;
