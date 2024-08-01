import { gql } from '@apollo/client';

const schema = {
  list: {
    name: 'sampleQuery',
    serviceName: 'graphql',
    query: gql`
      query sampleQuery($ids: [String], $title: String) {
        sampleQuery(ids: $ids, title: $title) {
          data {
            id
            title
            media {
              id
              full_url
            }
          }
          total
        }
      }
    `,
  },
};

export default schema;
