import { gql } from '@apollo/client';

const schema = {
  get: {
    name: 'sampleQuery',
    serviceName: 'graphql',
    query: gql`
      query sampleQuery($ids: [String]) {
        sampleQuery(ids: $ids) {
          data {
            id
            title
            media {
              id
              full_url
            }
          }
        }
      }
    `,
  },
};

export default schema;
