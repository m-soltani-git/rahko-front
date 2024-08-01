import { gql } from '@apollo/client';

const schema = {
  delete: {
    name: 'sampleMutation',
    serviceName: 'graphql',
    query: gql`
      mutation sampleMutation($ids: [String]!) {
        sampleMutation(ids: $ids) {
          messages
        }
      }
    `,
  },
};

export default schema;
