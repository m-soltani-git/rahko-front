import { gql } from '@apollo/client';

const schema = {
  current: {
    name: 'sampleQuery',
    serviceName: 'graphql',
    query: gql`
      query sampleQuery($ids: [String]) {
        sampleQuery(ids: $ids) {
          data {
            media {
              id
              name
              full_url
              size
              collection_name
            }
          }
        }
      }
    `,
  },
};

export default schema;
