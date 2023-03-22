import { buildSchema } from "graphql/utilities";

const schema = buildSchema(`
type Query {
  hello: String,
  bye : String
}
`);

export default schema;