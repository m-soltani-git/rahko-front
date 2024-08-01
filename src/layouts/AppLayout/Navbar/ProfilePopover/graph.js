import { gql } from "@apollo/client";

export default {
  revokeDevice: {
    name: "revokeDevice",
    serviceName: "auth",
    query: gql`
      mutation revokeDevice($tokens: [String]) {
        revokeDevice(tokens: $tokens) {
          messages
        }
      }
    `,
  },
};
