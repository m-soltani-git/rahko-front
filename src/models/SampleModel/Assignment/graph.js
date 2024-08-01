import { gql } from '@apollo/client';

const schema = {
  list: {
    name: 'sampleQuery',
    serviceName: 'graphql',
    query: gql`
      query sampleQuery($ids: [String]) {
        sampleQuery(ids: $ids) {
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
