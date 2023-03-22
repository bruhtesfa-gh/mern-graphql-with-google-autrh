import { gql } from "apollo-server-express"
const typeDefs = gql`
type Query {
  users: [User!]!
  products: [Product]!
  user(id:String): User
  me: User 
}

type Mutation {
  login(username:String! , password:String!):LogIn
  logout(token:String!):Boolean!
  addProduct(name: String!, category: String): Product!
}


type LogIn{
  name:String!
  token:String!
}

type User{
  _id:String!
  name:String!
  roles:[String!]!
  password:String!
  permissions:[String!]!
  products: [Product!]!
}

type Role {
  _id:String!
  name:String!
  permissions:[String!]!
}

type Product{
  _id:String!
  name:String!
  category:String!
  user:User! 
}
`

export default typeDefs;