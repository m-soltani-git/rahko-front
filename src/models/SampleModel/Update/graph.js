import { gql } from '@apollo/client';

const schema = {
  get: {
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
  update: {
    name: 'sampleMutation',
    serviceName: 'graphql',
    query: gql`
      mutation sampleMutation($ids: [String]!, $title: String!, $details: String) {
        sampleMutation(ids: $ids, title: $title, details: $details) {
          messages
        }
      }
    `,
  },
};

export default schema;
