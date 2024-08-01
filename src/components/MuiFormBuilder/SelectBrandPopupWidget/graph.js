import { gql } from '@apollo/client';

const schema = {
  list: {
    name: 'brand',
    serviceName: 'graphql',
    query: gql`
      query listBrand($limit: Int, $title: String) {
        brand(limit: $limit, title: $title) {
          total
          data {
            id
            title
          }
        }
      }
    `,
  },
};

export default schema;
