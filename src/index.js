import { request } from "graphql-request";
import { normalize } from "gql-cache";
import gql from "graphql-tag";

const query = gql`
  {
    customers {
      id
      name
      __typename
      orders {
        id
        sum
        __typename
      }
    }
  }
`;

request("http://localhost:3000/graphql", query).then(response => {
  console.log("response", response);
  const normalizedResponse = normalize(
    query,
    {},
    { data: response },
    obj => obj.__typename + ";" + obj.id
  );
  console.log("normalizedResponse", normalizedResponse);
});
