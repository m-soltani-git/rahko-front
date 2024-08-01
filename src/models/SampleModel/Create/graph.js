import { gql } from '@apollo/client';

const schema = {
  create: {
    name: 'sampleMutation',
    serviceName: 'graphql',
    query: gql`
      mutation sampleMutation(title: $title, details: $details) {
        sampleMutation($title: String!, $details: String) {
          messages
        }
      }
    `,
  },
};

export default schema;
